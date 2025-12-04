import type { DNAFormConfig, BasePairColors } from '../types/dna';

export const B_DNA: DNAFormConfig = {
  helixDiameter: 20,
  risePerBasePair: 3.4,
  basePairsPerTurn: 10.5,
  rotationPerBasePair: 34.3, // degrees
  backboneRadius: 10,
};

export const A_DNA: DNAFormConfig = {
  helixDiameter: 23,
  risePerBasePair: 2.6,
  basePairsPerTurn: 11,
  rotationPerBasePair: 32.7,
  backboneRadius: 11.5,
};

export const Z_DNA: DNAFormConfig = {
  helixDiameter: 18,
  risePerBasePair: 3.7,
  basePairsPerTurn: 12,
  rotationPerBasePair: -30, // Negative = left-handed helix
  backboneRadius: 9,
};

export const DNA_FORMS = { A: A_DNA, B: B_DNA, Z: Z_DNA };

export const BASE_COLORS: BasePairColors = {
  adenine: '#FF6B6B',
  thymine: '#4ECDC4',
  guanine: '#45B7D1',
  cytosine: '#96CEB4',
};

export const BACKBONE_COLOR = '#c0c0c0';

// Complementary base pairs
export const BASE_PAIRS: Record<string, string> = {
  A: 'T',
  T: 'A',
  G: 'C',
  C: 'G',
};

// Default sequence for visualization
export const DEFAULT_SEQUENCE = 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG';
