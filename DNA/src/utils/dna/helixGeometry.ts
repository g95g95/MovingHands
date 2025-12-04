import type { DNAForm, DNAFormConfig, Nucleotide } from '../../types/dna';
import { DNA_FORMS, BASE_COLORS, BACKBONE_COLOR, BASE_PAIRS } from '../../constants/dnaStructure';

/**
 * Calculate the position of a backbone particle on the helix
 */
export function getBackbonePosition(
  basePairIndex: number,
  strand: 'leading' | 'lagging',
  config: DNAFormConfig
): [number, number, number] {
  const angle = (basePairIndex * config.rotationPerBasePair * Math.PI) / 180;
  const y = basePairIndex * config.risePerBasePair;

  // Offset for the second strand (180 degrees apart)
  const strandOffset = strand === 'lagging' ? Math.PI : 0;

  const x = Math.cos(angle + strandOffset) * config.backboneRadius;
  const z = Math.sin(angle + strandOffset) * config.backboneRadius;

  return [x, y, z];
}

/**
 * Calculate the position of a base on the helix (between backbone and center)
 */
export function getBasePosition(
  basePairIndex: number,
  strand: 'leading' | 'lagging',
  config: DNAFormConfig,
  distanceFromCenter: number = 0.5 // 0 = center, 1 = backbone
): [number, number, number] {
  const angle = (basePairIndex * config.rotationPerBasePair * Math.PI) / 180;
  const y = basePairIndex * config.risePerBasePair;

  const strandOffset = strand === 'lagging' ? Math.PI : 0;
  const radius = config.backboneRadius * distanceFromCenter;

  const x = Math.cos(angle + strandOffset) * radius;
  const z = Math.sin(angle + strandOffset) * radius;

  return [x, y, z];
}

/**
 * Get the color for a nucleotide
 */
export function getNucleotideColor(nucleotide: Nucleotide): string {
  const colorMap: Record<Nucleotide, string> = {
    A: BASE_COLORS.adenine,
    T: BASE_COLORS.thymine,
    G: BASE_COLORS.guanine,
    C: BASE_COLORS.cytosine,
  };
  return colorMap[nucleotide];
}

/**
 * Get the complementary nucleotide
 */
export function getComplement(nucleotide: Nucleotide): Nucleotide {
  return BASE_PAIRS[nucleotide] as Nucleotide;
}

/**
 * Get DNA form configuration
 */
export function getDNAConfig(form: DNAForm): DNAFormConfig {
  return DNA_FORMS[form];
}

/**
 * Generate particle data for a DNA segment
 */
export function generateDNAParticles(
  sequence: string,
  form: DNAForm,
  startIndex: number = 0
) {
  const config = getDNAConfig(form);
  const backboneParticles: Array<{
    position: [number, number, number];
    color: string;
    strand: 'leading' | 'lagging';
    index: number;
  }> = [];

  const baseParticles: Array<{
    position: [number, number, number];
    color: string;
    strand: 'leading' | 'lagging';
    nucleotide: Nucleotide;
    index: number;
  }> = [];

  for (let i = 0; i < sequence.length; i++) {
    const nucleotide = sequence[i] as Nucleotide;
    const complement = getComplement(nucleotide);
    const globalIndex = startIndex + i;

    // Leading strand backbone
    backboneParticles.push({
      position: getBackbonePosition(globalIndex, 'leading', config),
      color: BACKBONE_COLOR,
      strand: 'leading',
      index: globalIndex,
    });

    // Lagging strand backbone
    backboneParticles.push({
      position: getBackbonePosition(globalIndex, 'lagging', config),
      color: BACKBONE_COLOR,
      strand: 'lagging',
      index: globalIndex,
    });

    // Leading strand base
    baseParticles.push({
      position: getBasePosition(globalIndex, 'leading', config, 0.6),
      color: getNucleotideColor(nucleotide),
      strand: 'leading',
      nucleotide,
      index: globalIndex,
    });

    // Lagging strand base (complement)
    baseParticles.push({
      position: getBasePosition(globalIndex, 'lagging', config, 0.6),
      color: getNucleotideColor(complement),
      strand: 'lagging',
      nucleotide: complement,
      index: globalIndex,
    });
  }

  return { backboneParticles, baseParticles };
}
