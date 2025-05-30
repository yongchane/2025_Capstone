import { create } from "zustand";

interface LocationState {
  start: string;
  end: string;
  searchHistory: string[];
  xlocation: number;
  ylocation: number;
  setXlocation: (xlocation: number) => void;
  setYlocation: (ylocation: number) => void;
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
  xlocation: 0,
  ylocation: 0,
  setXlocation: (xlocation) => set({ xlocation }),
  setYlocation: (ylocation) => set({ ylocation }),
  setStart: (start) => set({ start }),
  setEnd: (end) => {
    set({ end });
    // 검색어를 히스토리에 추가
    set((state) => ({
      searchHistory: [...new Set([end, ...state.searchHistory])].slice(0, 10), // 중복 제거 및 최근 10개만 유지
    }));
  },
  addToHistory: (location) =>
    set((state) => ({
      searchHistory: [...new Set([location, ...state.searchHistory])].slice(
        0,
        10
      ),
    })),
  clearHistory: () => set({ searchHistory: [] }),
  removeFromHistory: (location) =>
    set((state) => ({
      searchHistory: state.searchHistory.filter((item) => item !== location),
    })),
}));

export default useLocationStore;
