import { create } from "zustand";

interface LocationState {
  start: string;
  end: string;
  searchHistory: string[];
  xlocation: number | null;
  ylocation: number | null;
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
  searchHistory: [],
  xlocation: null,
  ylocation: null,
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
      // 유효한 검색어만 히스토리에 추가
      set((state) => ({
        searchHistory: [...new Set([end, ...state.searchHistory])].slice(0, 10),
      }));
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
