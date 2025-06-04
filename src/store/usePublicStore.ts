import { create } from "zustand";

// TmapClickAPI 응답 타입 정의
export interface TmapLeg {
  mode: "WALK" | "SUBWAY" | "BUS";
  route: string | null;
  sectionTime: number;
  distance: number;
  startName: string;
}

export interface TmapRoute {
  arrivalTime: string;
  departureTime: string;
  legs: TmapLeg[];
  totalTime: number;
  totalWalkDistance: number;
}

export interface RouteCategory {
  subway: TmapLeg[];
  bus: TmapLeg[];
  walk: TmapLeg[];
}

interface PublicStore {
  routes: TmapRoute[];
  selectedRoute: TmapRoute | null;
  routeCategories: RouteCategory;
  setRoutes: (routes: TmapRoute[]) => void;
  setSelectedRoute: (route: TmapRoute) => void;
  categorizeRoute: (route: TmapRoute) => void;
  clearRoutes: () => void;
}

const usePublicStore = create<PublicStore>((set, get) => ({
  routes: [],
  selectedRoute: null,
  routeCategories: {
    subway: [],
    bus: [],
    walk: [],
  },

  setRoutes: (routes: TmapRoute[]) => {
    set({ routes });
    // 첫 번째 경로를 기본 선택
    if (routes.length > 0) {
      get().setSelectedRoute(routes[0]);
    }
  },

  setSelectedRoute: (route: TmapRoute) => {
    set({ selectedRoute: route });
    get().categorizeRoute(route);
  },

  categorizeRoute: (route: TmapRoute) => {
    const subway: TmapLeg[] = [];
    const bus: TmapLeg[] = [];
    const walk: TmapLeg[] = [];

    route.legs.forEach((leg) => {
      switch (leg.mode) {
        case "SUBWAY":
          subway.push(leg);
          break;
        case "BUS":
          bus.push(leg);
          break;
        case "WALK":
          walk.push(leg);
          break;
      }
    });

    set({
      routeCategories: {
        subway,
        bus,
        walk,
      },
    });
  },

  clearRoutes: () => {
    set({
      routes: [],
      selectedRoute: null,
      routeCategories: {
        subway: [],
        bus: [],
        walk: [],
      },
    });
  },
}));

export default usePublicStore;
