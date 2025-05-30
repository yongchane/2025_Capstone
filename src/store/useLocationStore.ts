import { create } from "zustand";

interface LocationState {
  end: string;
  start: string;
  setEnd: (location: string) => void;
  setStart: (location: string) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  end: "",
  start: "",
  setEnd: (location) => set({ end: location }),
  setStart: (location) => set({ start: location }),
}));

export default useLocationStore;
