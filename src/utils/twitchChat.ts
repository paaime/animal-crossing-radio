/** A parsed chat message from Twitch IRC. */
export interface ITwitchChatMessage {
  /** Stable Twitch user id (preferred dedupe key for votes). */
  userId: string;
  /** Display name, used only for debugging / potential UI. */
  username: string;
  /** Raw message text. */
  text: string;
}

export type ChatStatus = 'connecting' | 'connected' | 'disconnected';

interface TwitchChatOptions {
  channel: string;
  onMessage: (message: ITwitchChatMessage) => void;
  onStatusChange?: (status: ChatStatus) => void;
}

/**
 * Anonymous, read-only Twitch IRC client over WebSocket.
 *
 * Reading public chat requires no OAuth: we log in as an anonymous
 * `justinfan<n>` user. Nothing here is a secret. The client auto-reconnects
 * with backoff and answers server PINGs to stay alive.
 */
export class TwitchChatClient {
  private readonly channel: string;
  private readonly onMessage: (message: ITwitchChatMessage) => void;
  private readonly onStatusChange?: (status: ChatStatus) => void;

  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private failureCount = 0;
  private closedByUser = false;

  constructor({ channel, onMessage, onStatusChange }: TwitchChatOptions) {
    this.channel = channel.trim().toLowerCase();
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
  }

  connect(): void {
    if (typeof window === 'undefined') return; // browser-only
    this.closedByUser = false;
    this.openSocket();
  }

  disconnect(): void {
    this.closedByUser = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      // Detach handlers so the close event doesn't trigger a reconnect.
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      try {
        this.ws.close();
      } catch {
        // ignore close errors on teardown
      }
      this.ws = null;
    }
    this.notifyStatus('disconnected');
  }

  private openSocket(): void {
    this.notifyStatus('connecting');
    let socket: WebSocket;
    try {
      socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    } catch (error) {
      console.error('Twitch chat: failed to open socket', error);
      this.scheduleReconnect();
      return;
    }
    this.ws = socket;

    socket.onopen = () => {
      // Anonymous login: a random justinfan nick, no password required.
      const anonNick = `justinfan${10_000 + Math.floor((this.failureCount + 1) * 1_777)}`;
      socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      socket.send(`NICK ${anonNick}`);
      socket.send(`JOIN #${this.channel}`);
      this.failureCount = 0;
      this.notifyStatus('connected');
    };

    socket.onmessage = (event) => {
      this.handleRaw(String(event.data));
    };

    socket.onerror = () => {
      // The close handler will run next and schedule the reconnect.
      console.error('Twitch chat: socket error');
    };

    socket.onclose = () => {
      this.ws = null;
      this.notifyStatus('disconnected');
      if (!this.closedByUser) this.scheduleReconnect();
    };
  }

  private scheduleReconnect(): void {
    const reconnectDelaysMs = [1_000, 2_000, 5_000, 10_000, 30_000];
    if (this.closedByUser) return;
    const delay =
      reconnectDelaysMs[
        Math.min(this.failureCount, reconnectDelaysMs.length - 1)
      ];
    this.failureCount += 1;
    this.reconnectTimer = setTimeout(() => this.openSocket(), delay);
  }

  /** A single frame may contain several CRLF-separated IRC lines. */
  private handleRaw(raw: string): void {
    const lines = raw.split('\r\n').filter((line) => line.length > 0);
    for (const line of lines) {
      if (line.startsWith('PING')) {
        this.ws?.send('PONG :tmi.twitch.tv');
        continue;
      }
      const parsed = parsePrivmsg(line);
      if (parsed) this.onMessage(parsed);
    }
  }

  private notifyStatus(status: ChatStatus): void {
    this.onStatusChange?.(status);
  }
}

/** Parse `key=value;key=value` IRC tag blob into a plain object. */
function parseTags(tagBlob: string): Record<string, string> {
  return tagBlob.split(';').reduce<Record<string, string>>((acc, pair) => {
    const eq = pair.indexOf('=');
    if (eq === -1) return acc;
    return { ...acc, [pair.slice(0, eq)]: pair.slice(eq + 1) };
  }, {});
}

/**
 * Extract a chat message from a single IRC line, or null if it isn't a
 * user PRIVMSG. Handles the tagged Twitch format:
 *
 *   @tags :nick!nick@nick.tmi.twitch.tv PRIVMSG #channel :message text
 */
export function parsePrivmsg(line: string): ITwitchChatMessage | null {
  let rest = line;
  let tags: Record<string, string> = {};

  if (rest.startsWith('@')) {
    const spaceIdx = rest.indexOf(' ');
    if (spaceIdx === -1) return null;
    tags = parseTags(rest.slice(1, spaceIdx));
    rest = rest.slice(spaceIdx + 1);
  }

  if (!rest.startsWith(':')) return null;
  const prefixEnd = rest.indexOf(' ');
  if (prefixEnd === -1) return null;
  const prefix = rest.slice(1, prefixEnd); // nick!nick@nick.tmi.twitch.tv
  const afterPrefix = rest.slice(prefixEnd + 1);

  if (!afterPrefix.startsWith('PRIVMSG')) return null;

  const textStart = afterPrefix.indexOf(' :');
  if (textStart === -1) return null;
  const text = afterPrefix.slice(textStart + 2);

  const nick = prefix.split('!')[0] || 'unknown';
  const userId = tags['user-id'] || nick;
  const username = tags['display-name'] || nick;

  return { userId, username, text };
}
