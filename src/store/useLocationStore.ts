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
  preferred: string;
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
  setPreferred: (preferred: string | null) => void;
  setClick: (click: string) => void;
  setSearchE: (searchE: string) => void;
  setSearchS: (searchS: string) => void;
  setXlocation: (xlocation: number | null) => void;
  setYlocation: (ylocation: number | null) => void;
  setStartX: (startX: number | null) => void;
  setStartY: (startY: number | null) => void;
  setEndX: (endX: number | null) => void;
  setEndY: (endY: number | null) => void;
  setStart: (start: string) => void;
  setEnd: (end: string) => void;
  addToHistory: (location: string) => void;
  clearHistory: () => void;
  removeFromHistory: (location: string) => void;
}

// localStorage에서 preferred 값을 가져오는 함수
const getInitialPreferred = (): string => {
  try {
    return localStorage.getItem("userPreference") || "";
  } catch {
    return "";
  }
};

const useLocationStore = create<LocationState>((set) => ({
  start: "",
  end: "",
  searchE: "",
  searchS: "",
  searchHistory: [],
  xlocation: null,
  ylocation: null,
  click: "",
  preferred: getInitialPreferred(), // localStorage에서 초기값 설정
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  setClick: (click) => {
    set({ click });
  },
  setPreferred: (preferred) => {
    if (preferred !== undefined && preferred !== null) {
      set({ preferred });
      // localStorage에도 동시에 저장
      try {
        localStorage.setItem("userPreference", preferred);
      } catch (error) {
        console.error("localStorage 저장 실패:", error);
      }
    }
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
  // 출발지, 목적지 설정
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

  // 출발지, 목적지 좌표 설정
  setStartX: (startX) => {
    if (startX !== undefined && startX !== null) {
      set({ startX });
    }
  },
  setStartY: (startY) => {
    if (startY !== undefined && startY !== null) {
      set({ startY });
    }
  },
  setEndX: (endX) => {
    if (endX !== undefined && endX !== null) {
      set({ endX });
    }
  },
  setEndY: (endY) => {
    if (endY !== undefined && endY !== null) {
      set({ endY });
    }
  },
  // 현재 위치 좌표 설정
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

  // 검색 기록 추가
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
