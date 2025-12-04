export type Nucleotide = 'A' | 'T' | 'G' | 'C';

export type DNAForm = 'A' | 'B' | 'Z';

export interface DNAFormConfig {
  helixDiameter: number;
  risePerBasePair: number;
  basePairsPerTurn: number;
  rotationPerBasePair: number;
  backboneRadius: number;
}

export interface DNAParticle {
  id: string;
  type: 'backbone' | 'base' | 'hydrogen-bond';
  position: [number, number, number];
  color: string;
  size: number;
  basePairIndex: number;
  strand: 'leading' | 'lagging';
  nucleotide?: Nucleotide;
}

export interface BasePairColors {
  adenine: string;
  thymine: string;
  guanine: string;
  cytosine: string;
}
