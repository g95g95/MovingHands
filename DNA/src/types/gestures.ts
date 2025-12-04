import type { NormalizedLandmark } from '@mediapipe/hands';

export type GestureState =
  | 'idle'
  | 'navigating'
  | 'zooming'
  | 'rotating'
  | 'selecting'
  | 'expanding'
  | 'unwinding';

export interface HandData {
  landmarks: NormalizedLandmark[];
  handedness: 'Left' | 'Right';
  confidence: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface PinchData {
  active: boolean;
  strength: number;
  position: Vector3;
}

export interface PalmRotation {
  roll: number;
  pitch: number;
  yaw: number;
}

export interface GestureContext {
  state: GestureState;
  leftHand: HandData | null;
  rightHand: HandData | null;
  navigation: Vector3;
  zoom: number;
  rotation: Vector3;
  expansion: number;
  pinchPosition: Vector3 | null;
  pinchActive: boolean;
}
