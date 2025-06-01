import { create } from "zustand";

interface LocationState {
  start: string;
  end: string;
  searchE: string;
  searchS: string;
  searchHistory: string[];
  xlocation: number | null;
  ylocation: number | null;
  click: string;
  setClick: (click: string) => void;
  setSearchE: (searchE: string) => void;
  setSearchS: (searchS: string) => void;
  setXlocation: (xlocation: number | null) => void;
  setYlocation: (ylocation: number | null) => void;
  setStart: (start: string) => void;
  setEnd: (end: string) => void;
  addToHistory: (location: string) => void;
  clearHistory: () => void;
  removeFromHistory: (location: string) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  start: "",
  end: "",
  searchE: "",
  searchS: "",
  searchHistory: [],
  xlocation: null,
  ylocation: null,
  click: "",
  setClick: (click) => {
    set({ click });
  },
  setSearchE: (searchE) => {
    if (searchE.trim()) {
      set({ searchE });
      set((state) => ({
        searchHistory: [...new Set([searchE, ...state.searchHistory])].slice(
          0,
          10
        ),
      }));
    }
  },
  setSearchS: (searchS) => {
    if (searchS.trim()) {
      set({ searchS });
      set((state) => ({
        searchHistory: [...new Set([searchS, ...state.searchHistory])].slice(
          0,
          10
        ),
      }));
    }
  },
  setXlocation: (xlocation) => {
    if (xlocation !== undefined && xlocation !== null) {
      set({ xlocation });
    }
  },
  setYlocation: (ylocation) => {
    if (ylocation !== undefined && ylocation !== null) {
      set({ ylocation });
    }
  },
  setStart: (start) => {
    if (start.trim()) {
      set({ start });
    }
  },
  setEnd: (end) => {
    if (end.trim()) {
      set({ end });
    }
  },
  addToHistory: (location) => {
    if (location.trim()) {
      set((state) => ({
        searchHistory: [...new Set([location, ...state.searchHistory])].slice(
          0,
          10
        ),
      }));
    }
  },
  clearHistory: () => set({ searchHistory: [] }),
  removeFromHistory: (location) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((item) => item !== location),
    })),
}));

export default useLocationStore;
