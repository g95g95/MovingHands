import type { NormalizedLandmark } from '@mediapipe/hands';
import type { GestureState } from '../../types/gestures';
import { isClosedFist, isOpenHand, getPalmCenter } from './gestures/fist';
import { detectPinch } from './gestures/pinch';
import { getNormalizedRotation } from './gestures/rotation';
import { calculateHandDistance, mapDistanceToZoom, getFingerSpread } from './gestures/distance';

export interface GestureResult {
  gesture: GestureState;
  strength: number;
  navigation: { x: number; y: number; z: number };
  zoom: number;
  rotation: { x: number; y: number };
  expansion: number;
  pinchPosition: { x: number; y: number; z: number } | null;
  pinchActive: boolean;
}

/**
 * Interpret gestures from hand landmarks
 */
export function interpretGestures(
  leftHand: NormalizedLandmark[] | null,
  rightHand: NormalizedLandmark[] | null,
  _previousNavigation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
): GestureResult {
  const result: GestureResult = {
    gesture: 'idle',
    strength: 0,
    navigation: { x: 0, y: 0, z: 0 },
    zoom: 1,
    rotation: { x: 0, y: 0 },
    expansion: 1,
    pinchPosition: null,
    pinchActive: false,
  };

  // No hands detected
  if (!leftHand && !rightHand) {
    return result;
  }

  // Two hands detected - check for zoom gesture
  if (leftHand && rightHand) {
    const distance = calculateHandDistance(leftHand, rightHand);
    result.zoom = mapDistanceToZoom(distance);
    result.gesture = 'zooming';
    result.strength = 1;

    // Check for unwinding gesture (both fists pulling apart)
    if (isClosedFist(leftHand) && isClosedFist(rightHand)) {
      const horizontalDistance = Math.abs(leftHand[0].x - rightHand[0].x);
      const verticalAlignment = Math.abs(leftHand[0].y - rightHand[0].y) < 0.15;

      if (horizontalDistance > 0.3 && verticalAlignment) {
        result.gesture = 'unwinding';
        result.strength = Math.min((horizontalDistance - 0.3) / 0.4, 1);
      }
    }

    return result;
  }

  // Single hand detected
  const hand = leftHand || rightHand;
  if (!hand) return result;

  // Check for pinch gesture first (highest priority for selection)
  const pinch = detectPinch(hand);
  if (pinch.active) {
    result.gesture = 'selecting';
    result.strength = pinch.strength;
    result.pinchPosition = pinch.position;
    result.pinchActive = true;
    return result;
  }

  // Check for closed fist (navigation)
  if (isClosedFist(hand)) {
    result.gesture = 'navigating';
    result.strength = 1;

    // Get palm center for navigation
    const palmCenter = getPalmCenter(hand);

    // Navigation is based on palm position relative to center
    // Y movement = scroll through DNA
    result.navigation = {
      x: (palmCenter.x - 0.5) * 2, // -1 to 1
      y: (palmCenter.y - 0.5) * 2, // -1 to 1 (used for scrolling)
      z: palmCenter.z,
    };

    return result;
  }

  // Check for open hand (rotation or expansion)
  if (isOpenHand(hand)) {
    const fingerSpread = getFingerSpread(hand);

    // If fingers are spread wide, it's an expansion gesture
    if (fingerSpread > 0.5) {
      result.gesture = 'expanding';
      result.strength = fingerSpread;
      result.expansion = 1 + fingerSpread * 2; // 1.0 to 3.0
      return result;
    }

    // Otherwise it's a rotation gesture
    result.gesture = 'rotating';
    result.strength = 1;
    result.rotation = getNormalizedRotation(hand);
    return result;
  }

  return result;
}
