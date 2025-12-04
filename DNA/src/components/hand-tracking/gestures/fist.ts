import type { NormalizedLandmark } from '@mediapipe/hands';
import { FINGER_TIPS, FINGER_MCP } from '../../../constants/gestureThresholds';

/**
 * Detect if hand is making a closed fist gesture
 * All fingertips should be below their respective MCP joints
 */
export function isClosedFist(landmarks: NormalizedLandmark[]): boolean {
  // Check if all fingertips are curled (below their MCP)
  const fingersCurled = (
    landmarks[FINGER_TIPS.index].y > landmarks[FINGER_MCP.index].y &&
    landmarks[FINGER_TIPS.middle].y > landmarks[FINGER_MCP.middle].y &&
    landmarks[FINGER_TIPS.ring].y > landmarks[FINGER_MCP.ring].y &&
    landmarks[FINGER_TIPS.pinky].y > landmarks[FINGER_MCP.pinky].y
  );

  // Thumb should be tucked (closer to palm center)
  const wrist = landmarks[0];
  const thumbTip = landmarks[FINGER_TIPS.thumb];
  const thumbMcp = landmarks[FINGER_MCP.thumb];

  const thumbTucked = Math.abs(thumbTip.x - wrist.x) < Math.abs(thumbMcp.x - wrist.x);

  return fingersCurled && thumbTucked;
}

/**
 * Detect if hand is open (all fingers extended)
 */
export function isOpenHand(landmarks: NormalizedLandmark[]): boolean {
  // All fingertips should be above their MCP joints (extended)
  const fingersExtended = (
    landmarks[FINGER_TIPS.index].y < landmarks[FINGER_MCP.index].y &&
    landmarks[FINGER_TIPS.middle].y < landmarks[FINGER_MCP.middle].y &&
    landmarks[FINGER_TIPS.ring].y < landmarks[FINGER_MCP.ring].y &&
    landmarks[FINGER_TIPS.pinky].y < landmarks[FINGER_MCP.pinky].y
  );

  return fingersExtended;
}

/**
 * Get the palm center position (average of wrist and middle MCP)
 */
export function getPalmCenter(landmarks: NormalizedLandmark[]): { x: number; y: number; z: number } {
  const wrist = landmarks[0];
  const middleMcp = landmarks[FINGER_MCP.middle];

  return {
    x: (wrist.x + middleMcp.x) / 2,
    y: (wrist.y + middleMcp.y) / 2,
    z: (wrist.z + middleMcp.z) / 2,
  };
}
