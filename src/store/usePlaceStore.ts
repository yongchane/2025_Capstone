import { create } from "zustand";

export type CategoryType = "전체" | "음식점" | "카페" | "술집" | "맞춤형 추천";

export interface Place {
  placeName: string;
  placeUrl: string;
  x: number;
  y: number;
  addressName: string;
}

interface PlaceStore {
  restaurant: Place[];
  cafe: Place[];
  bar: Place[];
  recommendPlaces: Place[];
  hasRecommendation: boolean;
  selectedCategory: CategoryType;
  setRestaurant: (restaurant: Place[]) => void;
  setCafe: (cafe: Place[]) => void;
  setBar: (bar: Place[]) => void;
  setRecommendPlaces: (recommendPlaces: Place[]) => void;
  setHasRecommendation: (hasRecommendation: boolean) => void;
  setSelectedCategory: (category: CategoryType) => void;
}

interface InputPlaceStore {
  inputPlace: Place[];
  changeView: boolean;
  setInputPlace: (inputPlace: Place[]) => void;
  setChangeView: (changeView: boolean) => void;
}

const usePlaceStore = create<PlaceStore>((set) => ({
  restaurant: [],
  cafe: [],
  bar: [],
  recommendPlaces: [],
  hasRecommendation: false,
  selectedCategory: "전체",
  setRestaurant: (restaurant: Place[]) => set({ restaurant }),
  setCafe: (cafe: Place[]) => set({ cafe }),
  setBar: (bar: Place[]) => set({ bar }),
  setRecommendPlaces: (recommendPlaces: Place[]) => set({ recommendPlaces }),
  setHasRecommendation: (hasRecommendation: boolean) =>
    set({ hasRecommendation }),
  setSelectedCategory: (category: CategoryType) =>
    set({ selectedCategory: category }),
}));

const useInputPlace = create<InputPlaceStore>((set) => ({
  inputPlace: [],
  changeView: false,
  setInputPlace: (inputPlace: Place[]) => set({ inputPlace }),
  setChangeView: (changeView: boolean) => set({ changeView }),
}));

export { usePlaceStore, useInputPlace };
