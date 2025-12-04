import { create } from 'zustand';
import type { GestureState, HandData, Vector3 } from '../types/gestures';

interface GestureStore {
  // Raw hand data
  leftHand: HandData | null;
  rightHand: HandData | null;

  // Processed gestures
  currentGesture: GestureState;
  gestureStrength: number;

  // Derived values (smoothed)
  navigation: Vector3;
  zoom: number;
  rotation: Vector3;
  expansion: number;
  pinchPosition: Vector3 | null;
  pinchActive: boolean;

  // Actions
  updateHands: (left: HandData | null, right: HandData | null) => void;
  setGesture: (gesture: GestureState, strength?: number) => void;
  setNavigation: (nav: Vector3) => void;
  setZoom: (zoom: number) => void;
  setRotation: (rot: Vector3) => void;
  setExpansion: (exp: number) => void;
  setPinch: (position: Vector3 | null, active: boolean) => void;
  reset: () => void;
}

const initialState = {
  leftHand: null,
  rightHand: null,
  currentGesture: 'idle' as GestureState,
  gestureStrength: 0,
  navigation: { x: 0, y: 0, z: 0 },
  zoom: 1,
  rotation: { x: 0, y: 0, z: 0 },
  expansion: 1,
  pinchPosition: null,
  pinchActive: false,
};

export const useGestureStore = create<GestureStore>((set) => ({
  ...initialState,

  updateHands: (left, right) => set({ leftHand: left, rightHand: right }),

  setGesture: (gesture, strength = 1) => set({
    currentGesture: gesture,
    gestureStrength: strength
  }),

  setNavigation: (navigation) => set({ navigation }),

  setZoom: (zoom) => set({ zoom }),

  setRotation: (rotation) => set({ rotation }),

  setExpansion: (expansion) => set({ expansion }),

  setPinch: (pinchPosition, pinchActive) => set({ pinchPosition, pinchActive }),

  reset: () => set(initialState),
}));
