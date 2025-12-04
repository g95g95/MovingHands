# DNA-HAND-NAVIGATOR

# Best Practice
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY.
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.

## Project Overview

Interactive 3D DNA double helix visualization system controlled through real-time hand gesture recognition. The application renders DNA structure as a dynamic particle system using Three.js, with MediaPipe Hands providing gesture detection for intuitive navigation and manipulation.

**Core Concept**: Transform the abstract molecular structure of DNA into an explorable 3D environment where users can navigate, zoom, rotate, and interact with the double helix using only their hands through a webcam.

---

## Technology Stack

### Frontend Framework
- **React 18+** with TypeScript
- **Vite** as build tool (fast HMR, optimized builds)
- **Tailwind CSS** for UI styling

### 3D Rendering
- **Three.js** (r158+) for WebGL rendering
- **@react-three/fiber** for React integration
- **@react-three/drei** for helpers and utilities

### Hand Tracking
- **MediaPipe Hands** (@mediapipe/hands)
- **@mediapipe/camera_utils** for webcam handling
- **@mediapipe/drawing_utils** for debug visualization

### State Management
- **Zustand** for global state (gesture data, UI settings, DNA configuration)
- React Context for component-level state where appropriate

### Additional Libraries
- **leva** for debug GUI (development only)
- **stats.js** for performance monitoring
- **lodash/throttle** for gesture smoothing

---

## Project Structure

```
dna-hand-navigator/
├── public/
│   └── models/                    # Optional: precomputed DNA segments
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── DNAHelix.tsx              # Main DNA particle system
│   │   │   ├── DNABackbone.tsx           # Phosphate-sugar backbone particles
│   │   │   ├── BasePairs.tsx             # A-T, G-C base pair particles
│   │   │   ├── ParticleSystem.tsx        # Core particle rendering logic
│   │   │   ├── GestureIndicator3D.tsx    # 3D hand position feedback
│   │   │   └── Environment.tsx           # Lighting, fog, background
│   │   ├── hand-tracking/
│   │   │   ├── HandTracker.tsx           # MediaPipe initialization & loop
│   │   │   ├── GestureInterpreter.ts     # Raw landmarks → gestures
│   │   │   ├── HandDebugOverlay.tsx      # Canvas overlay for debugging
│   │   │   └── gestures/
│   │   │       ├── pinch.ts              # Pinch detection logic
│   │   │       ├── fist.ts               # Fist/open hand detection
│   │   │       ├── rotation.ts           # Hand rotation calculation
│   │   │       └── distance.ts           # Two-hand distance calc
│   │   ├── ui/
│   │   │   ├── ControlPanel.tsx          # Main settings panel
│   │   │   ├── ColorPicker.tsx           # Base pair color customization
│   │   │   ├── ViewModeSelector.tsx      # DNA form selector (A/B/Z)
│   │   │   ├── SequenceNavigator.tsx     # Jump to specific sequences
│   │   │   ├── InfoOverlay.tsx           # Current position/base info
│   │   │   └── GestureGuide.tsx          # Tutorial overlay
│   │   └── layout/
│   │       ├── MainLayout.tsx            # App shell
│   │       ├── CameraFeed.tsx            # Webcam display component
│   │       └── SplitView.tsx             # DNA view + camera layout
│   ├── hooks/
│   │   ├── useHandTracking.ts            # MediaPipe hook
│   │   ├── useGestureState.ts            # Processed gesture state
│   │   ├── useDNANavigation.ts           # Gesture → DNA movement
│   │   ├── useParticleSystem.ts          # Particle lifecycle management
│   │   ├── useSmoothValue.ts             # Value interpolation
│   │   └── useAnimationFrame.ts          # RAF wrapper
│   ├── stores/
│   │   ├── gestureStore.ts               # Hand/gesture global state
│   │   ├── dnaStore.ts                   # DNA config & position state
│   │   └── uiStore.ts                    # UI preferences
│   ├── utils/
│   │   ├── dna/
│   │   │   ├── helixGeometry.ts          # DNA helix math
│   │   │   ├── basePairColors.ts         # Color mappings
│   │   │   ├── sequenceParser.ts         # FASTA/sequence parsing
│   │   │   └── dnaConstants.ts           # Structural constants
│   │   ├── math/
│   │   │   ├── smoothing.ts              # Exponential smoothing
│   │   │   ├── mapping.ts                # Value range mapping
│   │   │   └── vectors.ts                # Vector utilities
│   │   └── three/
│   │       ├── particleShaders.ts        # Custom GLSL shaders
│   │       ├── instancedHelpers.ts       # Instanced mesh utilities
│   │       └── performanceUtils.ts       # LOD, culling helpers
│   ├── types/
│   │   ├── gestures.ts                   # Gesture type definitions
│   │   ├── dna.ts                        # DNA structure types
│   │   └── particles.ts                  # Particle system types
│   ├── constants/
│   │   ├── gestureThresholds.ts          # Detection thresholds
│   │   ├── dnaStructure.ts               # DNA dimensional constants
│   │   └── colors.ts                     # Default color palettes
│   ├── shaders/
│   │   ├── particle.vert                 # Vertex shader
│   │   ├── particle.frag                 # Fragment shader
│   │   ├── glow.frag                     # Glow effect shader
│   │   └── dna.glsl                      # Shared DNA utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── CLAUDE.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## DNA Structure Specifications

### Biological Accuracy

The DNA model should maintain reasonable biological accuracy while optimizing for visual appeal and performance.

#### B-DNA (Default Form) Dimensions
```typescript
const B_DNA = {
  helixDiameter: 20,              // Ångströms (scaled for visualization)
  risePerBasePair: 3.4,           // Ångströms
  basePairsPerTurn: 10.5,         // ~10-10.5 bp per complete rotation
  rotationPerBasePair: 34.3,      // degrees (360° / 10.5)
  majorGrooveWidth: 22,           // Ångströms
  minorGrooveWidth: 12,           // Ångströms
  backboneRadius: 10,             // Distance from helix axis
}
```

#### A-DNA Form (RNA-like)
```typescript
const A_DNA = {
  helixDiameter: 23,
  risePerBasePair: 2.6,
  basePairsPerTurn: 11,
  rotationPerBasePair: 32.7,
}
```

#### Z-DNA Form (Left-handed)
```typescript
const Z_DNA = {
  helixDiameter: 18,
  risePerBasePair: 3.7,
  basePairsPerTurn: 12,
  rotationPerBasePair: -30,       // Negative = left-handed helix
}
```

### Particle Representation

#### Backbone Particles (Phosphate-Sugar)
- Two continuous helical strands
- Each particle represents one nucleotide's backbone
- Color: Neutral (gray/white) or strand-differentiated
- Size: Medium (represents phosphate group)

#### Base Pair Particles
- Connect the two backbone strands
- Color-coded by base type:
  ```typescript
  const BASE_COLORS = {
    adenine: '#FF6B6B',     // Red family
    thymine: '#4ECDC4',     // Cyan family
    guanine: '#45B7D1',     // Blue family
    cytosine: '#96CEB4',    // Green family
  }
  ```
- Pairs always: A-T (2 hydrogen bonds), G-C (3 hydrogen bonds)
- Visual indicator for bond strength (particle connection intensity)

#### Hydrogen Bond Particles (Optional Detail Level)
- Small particles between base pairs
- 2 particles for A-T, 3 particles for G-C
- Very small, subtle glow

### Particle System Architecture

```typescript
interface DNAParticle {
  id: string;
  type: 'backbone' | 'base' | 'hydrogen-bond';
  position: Vector3;
  basePosition: Vector3;        // Rest position
  velocity: Vector3;
  color: Color;
  size: number;
  basePairIndex: number;        // Which bp this belongs to
  strand: 'leading' | 'lagging'; // Which strand
  nucleotide?: 'A' | 'T' | 'G' | 'C';
  opacity: number;
  glowIntensity: number;
}

interface DNASegment {
  startIndex: number;
  endIndex: number;
  particles: DNAParticle[];
  boundingBox: Box3;
  lodLevel: number;
}
```

---

## Hand Gesture Control System

### MediaPipe Hands Configuration

```typescript
const handsConfig = {
  maxNumHands: 2,
  modelComplexity: 1,           // 0=lite, 1=full
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5,
}
```

### Landmark Reference

MediaPipe provides 21 landmarks per hand:
```
0: WRIST
1-4: THUMB (CMC, MCP, IP, TIP)
5-8: INDEX (MCP, PIP, DIP, TIP)
9-12: MIDDLE (MCP, PIP, DIP, TIP)
13-16: RING (MCP, PIP, DIP, TIP)
17-20: PINKY (MCP, PIP, DIP, TIP)
```

### Gesture Definitions & Mappings

#### 1. NAVIGATION - Closed Fist Drag
**Detection**:
```typescript
function isClosedFist(landmarks: NormalizedLandmark[]): boolean {
  // All fingertips below their respective MCP joints
  const dominated = [8, 12, 16, 20].every((tipIdx, i) => {
    const mcpIdx = tipIdx - 3;
    return landmarks[tipIdx].y > landmarks[mcpIdx].y;
  });
  // Thumb tucked (tip x closer to palm center than MCP)
  const thumbTucked = Math.abs(landmarks[4].x - landmarks[0].x) < 
                      Math.abs(landmarks[2].x - landmarks[0].x);
  return dominated && thumbTucked;
}
```
**Action**: Move closed fist to navigate along DNA helix (Y-axis = scroll through sequence)

#### 2. ZOOM - Two-Hand Distance
**Detection**:
```typescript
function calculateHandDistance(
  leftHand: NormalizedLandmark[],
  rightHand: NormalizedLandmark[]
): number {
  const leftPalm = leftHand[0];  // wrist
  const rightPalm = rightHand[0];
  return Math.hypot(
    leftPalm.x - rightPalm.x,
    leftPalm.y - rightPalm.y,
    leftPalm.z - rightPalm.z
  );
}
```
**Action**: 
- Hands apart → Zoom in (closer to DNA)
- Hands together → Zoom out (wider view)
- Range mapping: 0.1-0.8 normalized → 2x-20x zoom

#### 3. ROTATION - Open Palm Rotation
**Detection**:
```typescript
function getPalmRotation(landmarks: NormalizedLandmark[]): {
  roll: number;   // Rotation around forward axis
  pitch: number;  // Tilt up/down
  yaw: number;    // Turn left/right
} {
  const wrist = landmarks[0];
  const middleMcp = landmarks[9];
  const indexMcp = landmarks[5];
  const pinkyMcp = landmarks[17];
  
  // Calculate palm plane normal
  const v1 = subtractVectors(middleMcp, wrist);
  const v2 = subtractVectors(pinkyMcp, indexMcp);
  const normal = crossProduct(v1, v2);
  
  return vectorToEuler(normal);
}
```
**Action**: Rotate DNA model in 3D space following palm orientation

#### 4. PINCH - Select/Highlight
**Detection**:
```typescript
function isPinching(landmarks: NormalizedLandmark[]): {
  active: boolean;
  strength: number;  // 0-1
  position: Vector3;
} {
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const distance = Math.hypot(
    thumbTip.x - indexTip.x,
    thumbTip.y - indexTip.y,
    thumbTip.z - indexTip.z
  );
  const pinchThreshold = 0.05;
  const releaseThreshold = 0.08;
  
  return {
    active: distance < pinchThreshold,
    strength: 1 - Math.min(distance / releaseThreshold, 1),
    position: midpoint(thumbTip, indexTip),
  };
}
```
**Action**: 
- Pinch to select a base pair
- Drag while pinching to highlight a sequence region
- Release to confirm selection

#### 5. SPREAD FINGERS - Expand/Explode View
**Detection**:
```typescript
function getFingerSpread(landmarks: NormalizedLandmark[]): number {
  const fingerTips = [4, 8, 12, 16, 20];
  let totalSpread = 0;
  for (let i = 0; i < fingerTips.length - 1; i++) {
    const tip1 = landmarks[fingerTips[i]];
    const tip2 = landmarks[fingerTips[i + 1]];
    totalSpread += Math.hypot(tip1.x - tip2.x, tip1.y - tip2.y);
  }
  return totalSpread / 4; // Average spread
}
```
**Action**: 
- Fingers spread → Expand helix (show individual components)
- Fingers together → Compact view
- Controls `helixExpansionFactor` (1.0 = normal, 3.0 = fully expanded)

#### 6. HAND TENSION - Animation Speed
**Detection**:
```typescript
function getHandTension(landmarks: NormalizedLandmark[]): number {
  // Measure how "tense" the hand is by finger curl
  const fingerCurls = [
    getFingerCurl(landmarks, 'index'),
    getFingerCurl(landmarks, 'middle'),
    getFingerCurl(landmarks, 'ring'),
    getFingerCurl(landmarks, 'pinky'),
  ];
  // 0 = relaxed/straight, 1 = fully curled
  return fingerCurls.reduce((a, b) => a + b, 0) / 4;
}

function getFingerCurl(
  landmarks: NormalizedLandmark[],
  finger: string
): number {
  const indices = FINGER_INDICES[finger]; // [mcp, pip, dip, tip]
  const mcp = landmarks[indices[0]];
  const tip = landmarks[indices[3]];
  const maxLength = /* fully extended length */;
  const currentLength = distance(mcp, tip);
  return 1 - (currentLength / maxLength);
}
```
**Action**: Controls auto-rotation speed of DNA (relaxed = slow, tense = fast/stop)

#### 7. TWO-HAND PULL APART - Unwind DNA
**Detection**:
```typescript
function isUnwindingGesture(
  leftHand: NormalizedLandmark[],
  rightHand: NormalizedLandmark[]
): { active: boolean; amount: number } {
  const bothFists = isClosedFist(leftHand) && isClosedFist(rightHand);
  const horizontalDistance = Math.abs(leftHand[0].x - rightHand[0].x);
  const verticalAlignment = Math.abs(leftHand[0].y - rightHand[0].y) < 0.15;
  
  return {
    active: bothFists && verticalAlignment && horizontalDistance > 0.3,
    amount: Math.min((horizontalDistance - 0.3) / 0.4, 1),
  };
}
```
**Action**: Animate DNA unwinding/separation (replication visualization)

### Gesture State Machine

```typescript
type GestureState = 
  | 'idle'
  | 'navigating'
  | 'zooming'
  | 'rotating'
  | 'selecting'
  | 'expanding'
  | 'unwinding';

interface GestureContext {
  state: GestureState;
  leftHand: HandData | null;
  rightHand: HandData | null;
  transitionTime: number;
  gestureStartPosition: Vector3 | null;
  accumulatedRotation: Euler;
  accumulatedZoom: number;
  selectedRegion: [number, number] | null;
}
```

### Smoothing & Responsiveness

```typescript
// Exponential moving average for smooth transitions
function smoothValue(
  current: number,
  target: number,
  smoothing: number = 0.15
): number {
  return current + (target - current) * smoothing;
}

// Different smoothing factors for different interactions
const SMOOTHING = {
  navigation: 0.12,      // Smooth scrolling
  zoom: 0.08,           // Slower zoom transitions
  rotation: 0.15,       // Responsive rotation
  expansion: 0.1,       // Gradual expansion
  selection: 0.2,       // Quick selection feedback
};
```

---

## Rendering & Performance

### Instanced Rendering Strategy

```typescript
// Use InstancedMesh for all particle types
const particleGeometry = new THREE.SphereGeometry(1, 16, 12);
const particleMaterial = new THREE.ShaderMaterial({
  vertexShader: particleVert,
  fragmentShader: particleFrag,
  uniforms: {
    time: { value: 0 },
    gestureInfluence: { value: 0 },
    expansionFactor: { value: 1 },
    highlightRegion: { value: new THREE.Vector2(-1, -1) },
    cameraPosition: { value: new THREE.Vector3() },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const backboneInstances = new THREE.InstancedMesh(
  particleGeometry,
  particleMaterial,
  MAX_BACKBONE_PARTICLES
);
```

### Level of Detail (LOD)

```typescript
interface LODConfig {
  level: number;
  distance: number;
  particleScale: number;
  skipFactor: number;        // Render every Nth particle
  showHydrogenBonds: boolean;
  backboneDetail: 'full' | 'simplified' | 'line';
}

const LOD_LEVELS: LODConfig[] = [
  { level: 0, distance: 0, particleScale: 1, skipFactor: 1, showHydrogenBonds: true, backboneDetail: 'full' },
  { level: 1, distance: 50, particleScale: 0.8, skipFactor: 1, showHydrogenBonds: false, backboneDetail: 'full' },
  { level: 2, distance: 100, particleScale: 0.6, skipFactor: 2, showHydrogenBonds: false, backboneDetail: 'simplified' },
  { level: 3, distance: 200, particleScale: 0.4, skipFactor: 4, showHydrogenBonds: false, backboneDetail: 'line' },
];
```

### Culling & Visibility

```typescript
// Only render visible DNA segments
function getVisibleSegments(
  camera: THREE.PerspectiveCamera,
  segments: DNASegment[]
): DNASegment[] {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);
  
  return segments.filter(segment => 
    frustum.intersectsBox(segment.boundingBox)
  );
}
```

### Target Performance Metrics
- **60 FPS** on mid-range hardware
- **Maximum particles**: 50,000 (with LOD)
- **Hand tracking latency**: <50ms
- **Gesture response time**: <100ms perceived

---

## UI/UX Specifications

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │                  3D DNA VIEWPORT                     │  │
│  │                                                      │  │
│  │                                                      │  │
│  │  ┌────────────┐                    ┌──────────────┐  │  │
│  │  │  GESTURE   │                    │   CURRENT    │  │  │
│  │  │  INDICATOR │                    │   BASE INFO  │  │  │
│  │  └────────────┘                    └──────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │   WEBCAM    │  │         SEQUENCE NAVIGATOR          │  │
│  │    FEED     │  │  ════════════════●═══════════════   │  │
│  │  (Picture   │  │  5'─────────────────────────────3'  │  │
│  │   in        │  └─────────────────────────────────────┘  │
│  │   Picture)  │                                           │
│  └─────────────┘  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───────────┐   │
│                   │ B │ │ A │ │ Z │ │ ⚙ │ │  COLORS   │   │
│                   └───┘ └───┘ └───┘ └───┘ └───────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Control Panel Components

```typescript
interface ControlPanelProps {
  // DNA Form Selection
  dnaForm: 'B' | 'A' | 'Z';
  onFormChange: (form: 'B' | 'A' | 'Z') => void;
  
  // Color Customization
  baseColors: Record<Nucleotide, string>;
  onColorChange: (base: Nucleotide, color: string) => void;
  backboneColor: string;
  onBackboneColorChange: (color: string) => void;
  
  // View Options
  showHydrogenBonds: boolean;
  showLabels: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
  
  // Sequence
  currentSequence: string;
  onSequenceLoad: (sequence: string) => void;
  onJumpToPosition: (index: number) => void;
}
```

### Gesture Guide Overlay

Display during first use or on demand:
```typescript
const GESTURE_GUIDE = [
  { gesture: '✊ Closed Fist + Drag', action: 'Navigate along DNA' },
  { gesture: '🤏 Pinch', action: 'Select base pair' },
  { gesture: '🖐️ Open Hand Rotate', action: 'Rotate 3D view' },
  { gesture: '👐 Two Hands Apart', action: 'Zoom in/out' },
  { gesture: '🖐️ Spread Fingers', action: 'Expand helix view' },
  { gesture: '✊✊ Pull Apart', action: 'Unwind DNA strands' },
];
```

### Color Scheme

```typescript
const THEME = {
  background: '#0a0a0f',
  backgroundGradient: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
  
  ui: {
    panel: 'rgba(20, 20, 35, 0.85)',
    panelBorder: 'rgba(100, 100, 150, 0.3)',
    text: '#e0e0e0',
    textMuted: '#808090',
    accent: '#6366f1',
    accentHover: '#818cf8',
  },
  
  dna: {
    adenine: '#FF6B6B',
    thymine: '#4ECDC4',
    guanine: '#45B7D1',
    cytosine: '#96CEB4',
    backbone: '#c0c0c0',
    hydrogenBond: '#ffffff40',
  },
  
  feedback: {
    gestureActive: '#22c55e',
    gestureInactive: '#6b7280',
    selection: '#fbbf24',
    highlight: '#f472b6',
  },
};
```

---

## State Management (Zustand)

### Gesture Store

```typescript
// stores/gestureStore.ts
interface HandData {
  landmarks: NormalizedLandmark[];
  handedness: 'Left' | 'Right';
  confidence: number;
}

interface GestureStore {
  // Raw hand data
  leftHand: HandData | null;
  rightHand: HandData | null;
  
  // Processed gestures
  currentGesture: GestureState;
  gestureStrength: number;
  
  // Derived values (smoothed)
  navigation: { x: number; y: number; z: number };
  zoom: number;
  rotation: { x: number; y: number; z: number };
  expansion: number;
  pinchPosition: Vector3 | null;
  
  // Actions
  updateHands: (left: HandData | null, right: HandData | null) => void;
  processGestures: () => void;
  resetGestures: () => void;
}
```

### DNA Store

```typescript
// stores/dnaStore.ts
interface DNAStore {
  // Structure
  form: 'A' | 'B' | 'Z';
  sequence: string;
  totalBasePairs: number;
  
  // View state
  currentPosition: number;        // Which bp is centered
  viewRange: [number, number];    // Visible bp range
  zoomLevel: number;
  rotationOffset: Euler;
  expansionFactor: number;
  
  // Selection
  selectedRange: [number, number] | null;
  highlightedBase: number | null;
  
  // Animation
  isAutoRotating: boolean;
  autoRotateSpeed: number;
  isUnwinding: boolean;
  unwindProgress: number;
  
  // Actions
  setForm: (form: 'A' | 'B' | 'Z') => void;
  loadSequence: (seq: string) => void;
  navigate: (delta: number) => void;
  setZoom: (zoom: number) => void;
  rotate: (euler: Euler) => void;
  setExpansion: (factor: number) => void;
  selectRange: (start: number, end: number) => void;
  clearSelection: () => void;
  toggleAutoRotate: () => void;
  startUnwind: () => void;
  stopUnwind: () => void;
}
```

### UI Store

```typescript
// stores/uiStore.ts
interface UIStore {
  // Panel visibility
  showControlPanel: boolean;
  showGestureGuide: boolean;
  showDebugOverlay: boolean;
  showCameraFeed: boolean;
  
  // Colors
  baseColors: Record<Nucleotide, string>;
  backboneColor: string;
  
  // Display options
  showHydrogenBonds: boolean;
  showLabels: boolean;
  showGrid: boolean;
  particleQuality: 'low' | 'medium' | 'high';
  
  // Camera feed
  cameraPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  cameraSize: 'small' | 'medium' | 'large';
  
  // Actions
  togglePanel: (panel: keyof UIStore) => void;
  setBaseColor: (base: Nucleotide, color: string) => void;
  setBackboneColor: (color: string) => void;
  setCameraPosition: (pos: UIStore['cameraPosition']) => void;
}
```

---

## Shader Specifications

### Particle Vertex Shader

```glsl
// shaders/particle.vert
uniform float time;
uniform float expansionFactor;
uniform vec2 highlightRegion; // [start, end] bp indices
uniform float gestureInfluence;

attribute vec3 instanceColor;
attribute float instanceSize;
attribute float basePairIndex;
attribute float particleType; // 0=backbone, 1=base, 2=hydrogen

varying vec3 vColor;
varying float vOpacity;
varying float vHighlight;

void main() {
  vColor = instanceColor;
  
  // Expansion effect
  vec3 expandedPosition = position;
  if (expansionFactor > 1.0) {
    // Move particles outward from helix axis
    vec2 radial = normalize(position.xz);
    expandedPosition.xz += radial * (expansionFactor - 1.0) * 5.0;
  }
  
  // Highlight calculation
  vHighlight = 0.0;
  if (highlightRegion.x >= 0.0) {
    float inRegion = step(highlightRegion.x, basePairIndex) * 
                     step(basePairIndex, highlightRegion.y);
    vHighlight = inRegion;
  }
  
  // Gesture-based displacement
  vec3 displaced = expandedPosition;
  displaced += sin(time * 2.0 + position.y * 0.1) * gestureInfluence * 0.5;
  
  // Size with gesture influence
  float finalSize = instanceSize * (1.0 + gestureInfluence * 0.3);
  finalSize *= (1.0 + vHighlight * 0.5);
  
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_PointSize = finalSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  
  // Distance-based opacity
  vOpacity = smoothstep(500.0, 50.0, -mvPosition.z);
}
```

### Particle Fragment Shader

```glsl
// shaders/particle.frag
uniform float time;

varying vec3 vColor;
varying float vOpacity;
varying float vHighlight;

void main() {
  // Circular particle with soft edge
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  
  // Glow effect
  float glow = exp(-dist * 3.0) * 0.5;
  
  // Color modification for highlight
  vec3 finalColor = vColor;
  if (vHighlight > 0.5) {
    finalColor = mix(vColor, vec3(1.0, 0.9, 0.3), 0.5);
    glow *= 2.0;
  }
  
  // Pulsing effect
  float pulse = sin(time * 3.0) * 0.1 + 0.9;
  
  // Final output
  vec3 color = finalColor + glow * finalColor;
  float finalAlpha = (alpha + glow) * vOpacity * pulse;
  
  gl_FragColor = vec4(color, finalAlpha);
}
```

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
1. Project setup (Vite + React + TypeScript + Tailwind)
2. Three.js scene setup with basic lighting
3. MediaPipe Hands integration
4. Basic hand landmark visualization
5. Core state management structure

### Phase 2: DNA Visualization (Days 3-4)
1. DNA helix geometry calculations
2. Particle system for backbone
3. Base pair particle placement
4. Color-coded nucleotides
5. Basic auto-rotation animation

### Phase 3: Gesture Controls (Days 5-6)
1. Gesture detection algorithms
2. Closed fist navigation
3. Two-hand zoom
4. Palm rotation mapping
5. Pinch selection
6. Finger spread expansion

### Phase 4: Polish & UI (Days 7-8)
1. UI panels implementation
2. Color picker integration
3. DNA form selector (A/B/Z)
4. Sequence navigator
5. Gesture guide overlay
6. Performance optimization
7. Visual effects (glow, particles)

### Phase 5: Advanced Features (Days 9-10)
1. DNA unwinding animation
2. Sequence loading (FASTA)
3. Region annotation
4. Export/share functionality
5. Mobile touch fallback
6. Final testing & polish

---

## Testing Requirements

### Unit Tests
- Gesture detection accuracy
- DNA geometry calculations
- State management actions
- Utility functions

### Integration Tests
- Hand tracking → State updates
- Gesture → DNA manipulation
- UI controls → Visual changes

### Performance Tests
- FPS under various particle counts
- Memory usage over time
- Gesture latency measurement

### Browser Compatibility
- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

---

## Environment Variables

```env
# .env.local
VITE_ENABLE_DEBUG=true
VITE_MEDIAPIPE_MODEL_PATH=/models
VITE_DEFAULT_SEQUENCE=ATCGATCGATCG...
VITE_MAX_PARTICLES=50000
```

---

## Additional Notes

### Accessibility Considerations
- Keyboard navigation fallback for all gesture controls
- High contrast mode option
- Screen reader announcements for selections
- Reduce motion option (disable auto-rotation)

### Mobile Support
- Touch gesture fallbacks (pinch-zoom, drag-rotate)
- Gyroscope-based rotation (optional)
- Simplified UI for smaller screens
- Camera permission handling

### Future Enhancements
- VR/AR support (WebXR)
- Voice commands integration
- Collaborative viewing (WebRTC)
- Protein structure support
- Educational mode with guided tours
- Export to 3D formats (GLTF, STL)

---

## Code Style Guidelines

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components under 200 lines
- Extract complex logic to custom hooks
- Use TypeScript strict mode
- Document complex algorithms
- Use meaningful variable names
- Avoid premature optimization
- Write self-documenting code
- Add JSDoc comments for public APIs

---

## References

- [Three.js Documentation](https://threejs.org/docs/)
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [DNA Structure Biology](https://www.nature.com/scitable/topicpage/discovery-of-dna-structure-and-function-watson-397/)
- [WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
