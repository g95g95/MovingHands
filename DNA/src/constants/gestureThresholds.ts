// Gesture detection thresholds
export const PINCH_THRESHOLD = 0.05;
export const PINCH_RELEASE_THRESHOLD = 0.08;

// Smoothing factors for different interactions
export const SMOOTHING = {
  navigation: 0.12,
  zoom: 0.08,
  rotation: 0.15,
  expansion: 0.1,
  selection: 0.2,
};

// MediaPipe confidence thresholds
export const DETECTION_CONFIDENCE = 0.7;
export const TRACKING_CONFIDENCE = 0.5;

// Finger landmark indices
export const FINGER_TIPS = {
  thumb: 4,
  index: 8,
  middle: 12,
  ring: 16,
  pinky: 20,
};

export const FINGER_MCP = {
  thumb: 2,
  index: 5,
  middle: 9,
  ring: 13,
  pinky: 17,
};

// Zoom range mapping
export const ZOOM_MIN = 2;
export const ZOOM_MAX = 20;
export const HAND_DISTANCE_MIN = 0.1;
export const HAND_DISTANCE_MAX = 0.8;
