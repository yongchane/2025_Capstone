import { create } from "zustand";

export type CategoryType = "전체" | "음식점" | "카페" | "술집";

export interface Place {
  placeName: string;
  placeUrl: string;
  x: number;
  y: number;
  addressName: string;
}
export interface InputPlace {
  inputPlace: Place[];
  changeView: boolean;
  setInputPlace: (inputPlace: Place[]) => void;
  setChangeView: (changeView: boolean) => void;
}
interface PlaceStore {
  restaurant: Place[];
  cafe: Place[];
  bar: Place[];
  selectedCategory: CategoryType;

  setRestaurant: (restaurant: Place[]) => void;
  setCafe: (cafe: Place[]) => void;
  setBar: (bar: Place[]) => void;
  setSelectedCategory: (category: CategoryType) => void;
}

const usePlaceStore = create<PlaceStore>((set) => ({
  restaurant: [],
  cafe: [],
  bar: [],
  selectedCategory: "전체",
  changeView: false,
  setRestaurant: (restaurant: Place[]) => set({ restaurant }),
  setCafe: (cafe: Place[]) => set({ cafe }),
  setBar: (bar: Place[]) => set({ bar }),
  setSelectedCategory: (category: CategoryType) =>
    set({ selectedCategory: category }),
}));

const useInputPlace = create<InputPlace>((set) => ({
  inputPlace: [],
  changeView: false,
  setChangeView: (changeView: boolean) => set({ changeView }),
  setInputPlace: (inputPlace: Place[]) => set({ inputPlace }),
}));
export { useInputPlace, usePlaceStore };
