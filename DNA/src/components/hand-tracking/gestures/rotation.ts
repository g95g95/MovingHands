import type { NormalizedLandmark } from '@mediapipe/hands';
import { FINGER_MCP } from '../../../constants/gestureThresholds';

export interface PalmRotation {
  roll: number;  // Rotation around forward axis (palm up/down)
  pitch: number; // Tilt up/down
  yaw: number;   // Turn left/right
}

/**
 * Calculate palm rotation from hand landmarks
 */
export function getPalmRotation(landmarks: NormalizedLandmark[]): PalmRotation {
  const wrist = landmarks[0];
  const indexMcp = landmarks[FINGER_MCP.index];
  const pinkyMcp = landmarks[FINGER_MCP.pinky];
  const middleMcp = landmarks[FINGER_MCP.middle];

  // Vector from wrist to middle MCP (palm direction)
  const palmDir = {
    x: middleMcp.x - wrist.x,
    y: middleMcp.y - wrist.y,
    z: middleMcp.z - wrist.z,
  };

  // Vector from index to pinky (palm width direction)
  const widthDir = {
    x: pinkyMcp.x - indexMcp.x,
    y: pinkyMcp.y - indexMcp.y,
    z: pinkyMcp.z - indexMcp.z,
  };

  // Calculate roll (rotation around forward axis)
  // Based on the angle of the width vector in the XY plane
  const roll = Math.atan2(widthDir.y, widthDir.x);

  // Calculate pitch (tilt up/down)
  // Based on the Y component of palm direction
  const palmLength = Math.sqrt(palmDir.x ** 2 + palmDir.y ** 2 + palmDir.z ** 2);
  const pitch = Math.asin(-palmDir.y / (palmLength || 1));

  // Calculate yaw (turn left/right)
  // Based on the X component of palm direction
  const yaw = Math.atan2(palmDir.x, -palmDir.z);

  return { roll, pitch, yaw };
}

/**
 * Get simplified rotation values for DNA control (-1 to 1 range)
 */
export function getNormalizedRotation(landmarks: NormalizedLandmark[]): { x: number; y: number } {
  const rotation = getPalmRotation(landmarks);

  return {
    x: Math.max(-1, Math.min(1, rotation.pitch / (Math.PI / 4))), // Pitch mapped to -1 to 1
    y: Math.max(-1, Math.min(1, rotation.yaw / (Math.PI / 2))),   // Yaw mapped to -1 to 1
  };
}
