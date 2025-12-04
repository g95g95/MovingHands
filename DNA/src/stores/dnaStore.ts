import { create } from 'zustand';
import type { DNAForm } from '../types/dna';
import { DEFAULT_SEQUENCE } from '../constants/dnaStructure';

interface DNAStore {
  // Structure
  form: DNAForm;
  sequence: string;
  totalBasePairs: number;

  // View state
  currentPosition: number;
  zoomLevel: number;
  rotationOffset: { x: number; y: number; z: number };
  expansionFactor: number;

  // Selection
  selectedRange: [number, number] | null;
  highlightedBase: number | null;

  // Animation
  isAutoRotating: boolean;
  autoRotateSpeed: number;
  isUnwinding: boolean;
  unwindProgress: number;

  // Actions
  setForm: (form: DNAForm) => void;
  loadSequence: (seq: string) => void;
  navigate: (delta: number) => void;
  setZoom: (zoom: number) => void;
  rotate: (euler: { x: number; y: number; z: number }) => void;
  setExpansion: (factor: number) => void;
  selectRange: (start: number, end: number) => void;
  clearSelection: () => void;
  setHighlightedBase: (index: number | null) => void;
  toggleAutoRotate: () => void;
  setAutoRotateSpeed: (speed: number) => void;
}

export const useDNAStore = create<DNAStore>((set) => ({
  // Initial state
  form: 'B',
  sequence: DEFAULT_SEQUENCE,
  totalBasePairs: DEFAULT_SEQUENCE.length,
  currentPosition: 0,
  zoomLevel: 1,
  rotationOffset: { x: 0, y: 0, z: 0 },
  expansionFactor: 1,
  selectedRange: null,
  highlightedBase: null,
  isAutoRotating: true,
  autoRotateSpeed: 0.5,
  isUnwinding: false,
  unwindProgress: 0,

  // Actions
  setForm: (form) => set({ form }),

  loadSequence: (seq) => set({
    sequence: seq.toUpperCase().replace(/[^ATGC]/g, ''),
    totalBasePairs: seq.length,
    currentPosition: 0,
  }),

  navigate: (delta) => set((state) => ({
    currentPosition: Math.max(0, Math.min(
      state.totalBasePairs - 1,
      state.currentPosition + delta
    )),
  })),

  setZoom: (zoomLevel) => set({ zoomLevel: Math.max(0.5, Math.min(5, zoomLevel)) }),

  rotate: (euler) => set((state) => ({
    rotationOffset: {
      x: state.rotationOffset.x + euler.x,
      y: state.rotationOffset.y + euler.y,
      z: state.rotationOffset.z + euler.z,
    },
  })),

  setExpansion: (expansionFactor) => set({
    expansionFactor: Math.max(1, Math.min(3, expansionFactor))
  }),

  selectRange: (start, end) => set({ selectedRange: [start, end] }),

  clearSelection: () => set({ selectedRange: null }),

  setHighlightedBase: (highlightedBase) => set({ highlightedBase }),

  toggleAutoRotate: () => set((state) => ({ isAutoRotating: !state.isAutoRotating })),

  setAutoRotateSpeed: (autoRotateSpeed) => set({ autoRotateSpeed }),
}));
