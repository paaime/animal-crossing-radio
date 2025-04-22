import { create } from 'zustand';

type Modal = {
  settingsOpen: boolean;
  libraryOpen: boolean;
  randomPopupOpen: boolean;
  setSettingsOpen: (settingsOpen: boolean) => void;
  setLibraryOpen: (libraryOpen: boolean) => void;
  setRandomPopupOpen: (randomPopupOpen: boolean) => void;
};

export const useModalStore = create<Modal>((set) => ({
  settingsOpen: false,
  libraryOpen: false,
  randomPopupOpen: false,
  setSettingsOpen: (settingsOpen: boolean) => set({ settingsOpen }),
  setLibraryOpen: (libraryOpen: boolean) => set({ libraryOpen }),
  setRandomPopupOpen: (randomPopupOpen: boolean) => set({ randomPopupOpen }),
}));
