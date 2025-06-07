import { create } from "zustand";

// FilterTransit API 응답 타입 정의
export interface FilterLeg {
  mode: string;
  route: string;
  sectionTime: number;
  distance: number;
  startName: string;
  endName: string;
  stations: string[];
  stationCount: number;
  descriptions: string[];
  stationId: string;
  routeId: string;
  predictTime: string;
}

export interface FilterRoute {
  legs: FilterLeg[];
  totalWalkDistance: number;
  totalTime: number;
  departureTime: string;
  arrivalTime: string;
}

// TmapAuto API 응답 타입 정의 (FilterRoute와 동일한 구조)
export interface TmapAutoRoute {
  legs: FilterLeg[];
  totalWalkDistance: number;
  totalTime: number;
  departureTime: string;
  arrivalTime: string;
}

export interface FilterTransitResponse {
  recommended: FilterRoute[];
  subwayOnly: FilterRoute[];
  busOnly: FilterRoute[];
  minTransfer: FilterRoute;
  minFare: FilterRoute;
  minTime: FilterRoute;
}

// TmapClickAPI 응답 타입 정의 (기존 구조 유지)
export interface TmapLeg {
  mode: string;
  route?: string;
  sectionTime: number;
  distance: number;
  startName: string;
  endName?: string;
  [key: string]: unknown; // 추가 속성들을 위한 인덱스 시그니처
}

export interface TmapRoute {
  arrivalTime: string;
  departureTime: string;
  legs: TmapLeg[];
  totalTime: number;
  totalWalkDistance: number;
}

interface PublicStore {
  // FilterTransit 관련
  filterData: FilterTransitResponse | null;
  selectedCategory: keyof FilterTransitResponse;
  selectedRoute: FilterRoute | null;
  customRouteData: TmapAutoRoute[] | null;
  // TmapClickAPI 관련
  tmapRoutes: TmapRoute[];

  // FilterTransit 관련 함수
  setFilterData: (data: FilterTransitResponse) => void;
  setSelectedCategory: (category: keyof FilterTransitResponse) => void;
  setSelectedRoute: (route: FilterRoute) => void;
  getCurrentRoutes: () => FilterRoute[];
  setCustomRouteData: (data: TmapAutoRoute[]) => void;
  // TmapClickAPI 관련 함수
  setTmapRoutes: (routes: TmapRoute[]) => void;

  // 전체 초기화
  clearAllData: () => void;
}

const usePublicStore = create<PublicStore>((set, get) => ({
  // FilterTransit 상태
  filterData: null,
  selectedCategory: "recommended",
  selectedRoute: null,
  customRouteData: null,
  // TmapClickAPI 상태
  tmapRoutes: [],

  // FilterTransit 함수들
  setFilterData: (data: FilterTransitResponse) => {
    set({ filterData: data });
    // 기본적으로 추천 경로의 첫 번째 경로를 선택
    if (data.recommended && data.recommended.length > 0) {
      get().setSelectedRoute(data.recommended[0]);
    }
  },

  setSelectedCategory: (category: keyof FilterTransitResponse) => {
    set({ selectedCategory: category });
    const routes = get().getCurrentRoutes();
    if (routes.length > 0) {
      get().setSelectedRoute(routes[0]);
    }
  },

  setSelectedRoute: (route: FilterRoute) => {
    set({ selectedRoute: route });
  },

  getCurrentRoutes: (): FilterRoute[] => {
    const { filterData, selectedCategory } = get();
    if (!filterData) return [];

    const categoryData = filterData[selectedCategory];
    if (Array.isArray(categoryData)) {
      return categoryData;
    } else if (categoryData) {
      return [categoryData];
    }
    return [];
  },

  setCustomRouteData: (data: TmapAutoRoute[]) => {
    set({ customRouteData: data });
  },

  // TmapClickAPI 함수들
  setTmapRoutes: (routes: TmapRoute[]) => {
    set({ tmapRoutes: routes });
  },

  // 전체 초기화
  clearAllData: () => {
    set({
      filterData: null,
      selectedCategory: "recommended",
      selectedRoute: null,
      customRouteData: null,
      tmapRoutes: [],
    });
  },
}));

export default usePublicStore;
