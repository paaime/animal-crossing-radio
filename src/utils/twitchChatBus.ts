import {
  ChatStatus,
  ITwitchChatMessage,
  TwitchChatClient,
} from './twitchChat';

type MessageListener = (message: ITwitchChatMessage) => void;
type StatusListener = (status: ChatStatus) => void;

/**
 * Process-wide fan-out over a single Twitch IRC connection.
 *
 * Several features consume the same chat (the song poll, the villager crowd)
 * and Twitch rate-limits connections, so we keep exactly one socket open and
 * broadcast every message to the current subscribers. The socket opens on the
 * first subscriber and closes when the last one leaves.
 */
let client: TwitchChatClient | null = null;
let connectedChannel: string | null = null;
let status: ChatStatus = 'disconnected';

// Reassigned, never mutated in place: a listener that unsubscribes during a
// broadcast must not shift the array being iterated.
let messageListeners: readonly MessageListener[] = [];
let statusListeners: readonly StatusListener[] = [];

const broadcastMessage = (message: ITwitchChatMessage): void => {
  for (const listener of messageListeners) {
    try {
      listener(message);
    } catch (error) {
      // One faulty consumer must not starve the others.
      console.error('Twitch chat bus: message listener failed', error);
    }
  }
};

const broadcastStatus = (next: ChatStatus): void => {
  status = next;
  for (const listener of statusListeners) {
    try {
      listener(next);
    } catch (error) {
      console.error('Twitch chat bus: status listener failed', error);
    }
  }
};

const ensureClient = (channel: string): void => {
  if (client && connectedChannel === channel) return;

  // Channel changed (or first subscriber): restart on the new channel.
  client?.disconnect();
  connectedChannel = channel;
  client = new TwitchChatClient({
    channel,
    onMessage: broadcastMessage,
    onStatusChange: broadcastStatus,
  });
  client.connect();
};

const teardownIfIdle = (): void => {
  if (messageListeners.length > 0 || statusListeners.length > 0) return;
  client?.disconnect();
  client = null;
  connectedChannel = null;
  status = 'disconnected';
};

/**
 * Receive every chat message of `channel`. Returns an unsubscribe function;
 * callers must invoke it on unmount or the socket is never released.
 */
export function subscribeToChat(
  channel: string,
  listener: MessageListener,
): () => void {
  ensureClient(channel);
  messageListeners = [...messageListeners, listener];

  let active = true;
  return () => {
    if (!active) return; // idempotent: double-unsubscribe must not over-release
    active = false;
    messageListeners = messageListeners.filter((item) => item !== listener);
    teardownIfIdle();
  };
}

/** Observe connection status. Fires immediately with the current status. */
export function subscribeToChatStatus(listener: StatusListener): () => void {
  statusListeners = [...statusListeners, listener];
  listener(status);

  let active = true;
  return () => {
    if (!active) return;
    active = false;
    statusListeners = statusListeners.filter((item) => item !== listener);
    teardownIfIdle();
  };
}

export function getChatStatus(): ChatStatus {
  return status;
}

/**
 * Feed a message to every subscriber as if Twitch had sent it. Used by the
 * debug spawner so local testing exercises the real path — villagers, poll
 * votes and all — without needing anyone to type in chat.
 */
export function publishLocalMessage(message: ITwitchChatMessage): void {
  broadcastMessage(message);
}
