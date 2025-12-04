import type { NormalizedLandmark } from '@mediapipe/hands';
import { FINGER_TIPS, PINCH_THRESHOLD, PINCH_RELEASE_THRESHOLD } from '../../../constants/gestureThresholds';

export interface PinchResult {
  active: boolean;
  strength: number; // 0-1, how strong the pinch is
  position: { x: number; y: number; z: number };
}

/**
 * Detect pinch gesture (thumb and index finger close together)
 */
export function detectPinch(landmarks: NormalizedLandmark[]): PinchResult {
  const thumbTip = landmarks[FINGER_TIPS.thumb];
  const indexTip = landmarks[FINGER_TIPS.index];

  // Calculate distance between thumb and index tips
  const distance = Math.sqrt(
    Math.pow(thumbTip.x - indexTip.x, 2) +
    Math.pow(thumbTip.y - indexTip.y, 2) +
    Math.pow(thumbTip.z - indexTip.z, 2)
  );

  // Determine if pinching
  const active = distance < PINCH_THRESHOLD;
  const strength = 1 - Math.min(distance / PINCH_RELEASE_THRESHOLD, 1);

  // Pinch position is midpoint between thumb and index
  const position = {
    x: (thumbTip.x + indexTip.x) / 2,
    y: (thumbTip.y + indexTip.y) / 2,
    z: (thumbTip.z + indexTip.z) / 2,
  };

  return { active, strength, position };
}

/**
 * Calculate thumb-index distance for continuous control
 */
export function getThumbIndexDistance(landmarks: NormalizedLandmark[]): number {
  const thumbTip = landmarks[FINGER_TIPS.thumb];
  const indexTip = landmarks[FINGER_TIPS.index];

  return Math.sqrt(
    Math.pow(thumbTip.x - indexTip.x, 2) +
    Math.pow(thumbTip.y - indexTip.y, 2) +
    Math.pow(thumbTip.z - indexTip.z, 2)
  );
}
