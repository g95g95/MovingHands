# DNA Hand Navigator - Development Plan

## Project Overview
Build an interactive 3D DNA double helix visualization controlled through real-time hand gesture recognition using React, Three.js, and MediaPipe Hands.

---

## Phase 1: Foundation Setup
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure Tailwind CSS
- [ ] Install core dependencies (three.js, @react-three/fiber, @react-three/drei)
- [ ] Install MediaPipe packages (@mediapipe/hands, @mediapipe/camera_utils)
- [ ] Install Zustand for state management
- [ ] Set up basic project structure (folders for components, hooks, stores, utils, types)
- [ ] Create basic App.tsx shell with layout

## Phase 2: Three.js Scene Setup
- [ ] Create basic Three.js scene with React Three Fiber
- [ ] Set up camera and orbit controls
- [ ] Add lighting (ambient + directional)
- [ ] Add environment/background (dark theme with gradient)
- [ ] Test render loop is working at 60fps

## Phase 3: MediaPipe Hand Tracking
- [ ] Create HandTracker component with MediaPipe initialization
- [ ] Set up webcam access with camera utils
- [ ] Process hand landmarks from MediaPipe
- [ ] Create Zustand gesture store for hand data
- [ ] Create HandDebugOverlay for visualization (development)
- [ ] Test hand detection is working

## Phase 4: DNA Helix Geometry
- [ ] Create DNA structure constants (B-DNA dimensions)
- [ ] Implement helix geometry calculations (spiral positions)
- [ ] Create backbone particle positions (two strands)
- [ ] Create base pair positions (connecting particles)
- [ ] Define color scheme for nucleotides (A, T, G, C)

## Phase 5: DNA Particle System
- [ ] Create DNAHelix component with instanced mesh
- [ ] Render backbone particles
- [ ] Render base pair particles with colors
- [ ] Add particle glow/shader effects
- [ ] Implement auto-rotation animation
- [ ] Create DNA store for structure state

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

## Phase 8: UI Components
- [ ] Create main layout with split view (3D viewport + camera feed)
- [ ] Create webcam picture-in-picture component
- [ ] Create gesture indicator overlay
- [ ] Create control panel (DNA form selector, colors)
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
(To be filled after completion)

### Summary of Changes Made
-

### Known Issues
-

### Future Improvements
-
