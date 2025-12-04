import type { NormalizedLandmark } from '@mediapipe/hands';
import { FINGER_TIPS, HAND_DISTANCE_MIN, HAND_DISTANCE_MAX, ZOOM_MIN, ZOOM_MAX } from '../../../constants/gestureThresholds';

/**
 * Calculate distance between two hands (wrist to wrist)
 */
export function calculateHandDistance(
  leftHand: NormalizedLandmark[],
  rightHand: NormalizedLandmark[]
): number {
  const leftWrist = leftHand[0];
  const rightWrist = rightHand[0];

  return Math.sqrt(
    Math.pow(leftWrist.x - rightWrist.x, 2) +
    Math.pow(leftWrist.y - rightWrist.y, 2) +
    Math.pow(leftWrist.z - rightWrist.z, 2)
  );
}

/**
 * Map hand distance to zoom level
 * Hands apart = zoom in (closer), hands together = zoom out (wider)
 */
export function mapDistanceToZoom(distance: number): number {
  // Clamp distance to expected range
  const clampedDistance = Math.max(HAND_DISTANCE_MIN, Math.min(HAND_DISTANCE_MAX, distance));

  // Normalize to 0-1 range
  const normalized = (clampedDistance - HAND_DISTANCE_MIN) / (HAND_DISTANCE_MAX - HAND_DISTANCE_MIN);

  // Map to zoom range (inverted: hands apart = higher zoom)
  return ZOOM_MIN + normalized * (ZOOM_MAX - ZOOM_MIN);
}

/**
 * Calculate finger spread (how spread apart the fingers are)
 */
export function getFingerSpread(landmarks: NormalizedLandmark[]): number {
  const fingerTips = [
    landmarks[FINGER_TIPS.thumb],
    landmarks[FINGER_TIPS.index],
    landmarks[FINGER_TIPS.middle],
    landmarks[FINGER_TIPS.ring],
    landmarks[FINGER_TIPS.pinky],
  ];

  let totalSpread = 0;
  for (let i = 0; i < fingerTips.length - 1; i++) {
    const tip1 = fingerTips[i];
    const tip2 = fingerTips[i + 1];
    totalSpread += Math.sqrt(
      Math.pow(tip1.x - tip2.x, 2) +
      Math.pow(tip1.y - tip2.y, 2)
    );
  }

  // Average spread normalized (typical spread range is 0.1 to 0.4)
  const averageSpread = totalSpread / 4;
  return Math.max(0, Math.min(1, (averageSpread - 0.1) / 0.3));
}

/**
 * Get midpoint between two hands
 */
export function getHandsMidpoint(
  leftHand: NormalizedLandmark[],
  rightHand: NormalizedLandmark[]
): { x: number; y: number; z: number } {
  const leftWrist = leftHand[0];
  const rightWrist = rightHand[0];

  return {
    x: (leftWrist.x + rightWrist.x) / 2,
    y: (leftWrist.y + rightWrist.y) / 2,
    z: (leftWrist.z + rightWrist.z) / 2,
  };
}
