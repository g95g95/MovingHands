# DNA Hand Navigator - Development Plan

## Project Overview
Build an interactive 3D DNA double helix visualization controlled through real-time hand gesture recognition using React, Three.js, and MediaPipe Hands.

---

## Phase 1: Foundation Setup ✅
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS
- [x] Install core dependencies (three.js, @react-three/fiber, @react-three/drei)
- [x] Install MediaPipe packages (@mediapipe/hands, @mediapipe/camera_utils)
- [x] Install Zustand for state management
- [x] Set up basic project structure (folders for components, hooks, stores, utils, types)
- [x] Create basic App.tsx shell with layout

## Phase 2: Three.js Scene Setup ✅
- [x] Create basic Three.js scene with React Three Fiber
- [x] Set up camera and orbit controls
- [x] Add lighting (ambient + directional)
- [x] Add environment/background (dark theme with gradient)
- [x] Test render loop is working at 60fps

## Phase 3: MediaPipe Hand Tracking ✅
- [x] Create HandTracker component with MediaPipe initialization
- [x] Set up webcam access with camera utils
- [x] Process hand landmarks from MediaPipe
- [x] Create Zustand gesture store for hand data
- [x] Create HandDebugOverlay for visualization (development)
- [x] Test hand detection is working

## Phase 4: DNA Helix Geometry ✅
- [x] Create DNA structure constants (B-DNA dimensions)
- [x] Implement helix geometry calculations (spiral positions)
- [x] Create backbone particle positions (two strands)
- [x] Create base pair positions (connecting particles)
- [x] Define color scheme for nucleotides (A, T, G, C)

## Phase 5: DNA Particle System ✅
- [x] Create DNAHelix component with instanced mesh
- [x] Render backbone particles
- [x] Render base pair particles with colors
- [x] Implement auto-rotation animation
- [x] Create DNA store for structure state

## Phase 6: Gesture Detection
- [ ] Implement gesture detection utilities:
  - [ ] Closed fist detection
  - [ ] Open hand detection
  - [ ] Pinch detection
  - [ ] Palm rotation calculation
  - [ ] Finger spread calculation
  - [ ] Two-hand distance detection
- [ ] Create gesture state machine
- [ ] Add smoothing/interpolation for gesture values

## Phase 7: Gesture-DNA Mapping
- [ ] Implement navigation (closed fist drag → scroll through helix)
- [ ] Implement zoom (two-hand distance → camera zoom)
- [ ] Implement rotation (open palm rotate → helix rotation)
- [ ] Implement pinch selection (pinch → highlight base pair)
- [ ] Implement expansion (spread fingers → expand helix view)
- [ ] Add visual feedback for active gestures

## Phase 8: UI Components ✅
- [x] Create main layout with split view (3D viewport + camera feed)
- [x] Create webcam picture-in-picture component
- [x] Create gesture indicator overlay
- [x] Create control panel (DNA form selector, colors)
- [ ] Create sequence navigator (position indicator)
- [ ] Create gesture guide overlay (tutorial)
- [ ] Create info overlay (current base pair info)

## Phase 9: Polish & Effects
- [ ] Add glow effects to particles
- [ ] Implement LOD (level of detail) for performance
- [ ] Add highlight effects for selected regions
- [ ] Add smooth transitions between states
- [ ] Optimize particle rendering
- [ ] Test and tune gesture sensitivity

## Phase 10: Final Testing & Review
- [ ] Test all gesture controls work smoothly
- [ ] Test performance on different devices
- [ ] Fix any bugs discovered
- [ ] Add error handling (camera permissions, etc.)
- [ ] Clean up code and add documentation

---

## Review Section

### Summary of Changes Made (Phase 1-5, Partial 8)
- Initialized Vite + React + TypeScript project with Tailwind CSS
- Installed Three.js, React Three Fiber, MediaPipe Hands, and Zustand
- Created complete project structure with components, hooks, stores, utils, and types
- Implemented DNA helix geometry calculations for A, B, and Z-DNA forms
- Created particle-based DNA rendering with instanced meshes for performance
- Implemented auto-rotation and DNA form switching
- Created HandTracker component with MediaPipe Hands integration
- Built UI components: GestureIndicator, ControlPanel, MainLayout
- App builds and compiles successfully

### Files Created
- src/types/gestures.ts, dna.ts
- src/constants/dnaStructure.ts, gestureThresholds.ts
- src/stores/gestureStore.ts, dnaStore.ts
- src/utils/math/smoothing.ts
- src/utils/dna/helixGeometry.ts
- src/components/canvas/DNAHelix.tsx, Environment.tsx, Scene.tsx
- src/components/hand-tracking/HandTracker.tsx
- src/components/ui/GestureIndicator.tsx, ControlPanel.tsx
- src/components/layout/MainLayout.tsx

### Known Issues
- Gesture detection not yet connected to DNA controls
- Need to implement actual gesture detection algorithms

### Future Improvements
- Add glow shader effects to particles
- Implement LOD for performance optimization
- Add more UI feedback for gestures
