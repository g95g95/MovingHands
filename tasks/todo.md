# 3D Particle System - Development Plan

## Objective
Create a real-time interactive 3D particle system using Three.js with dual-hand tracking. Particles respond to hand gestures (tension/closing) for scaling and expansion effects.

## Requirements
- Detect both hands through camera
- Control particle scaling + expansion by hand tension & closing
- Template panel: hearts / flowers / saturn / fireworks
- Color selector for particle colors
- Instant particle reaction to gesture changes
- Simple, modern, clean UI

## Todo Items

### Setup & Structure
- [x] Create `particle-system.html` with base structure
- [x] Add Three.js library for 3D rendering
- [x] Add MediaPipe Hands for dual-hand tracking
- [x] Set up responsive canvas with full viewport

### 3D Particle System Core
- [x] Initialize Three.js scene, camera, renderer
- [x] Create ParticleSystem class with configurable templates
- [x] Implement particle buffer geometry for performance
- [x] Add particle animation loop

### Particle Templates
- [x] Hearts template - heart-shaped particle distribution
- [x] Flowers template - petal/bloom pattern
- [x] Saturn template - ring orbital pattern
- [x] Fireworks template - explosion burst pattern

### Hand Tracking Integration
- [x] Configure MediaPipe for dual-hand (maxNumHands: 2)
- [x] Implement hand openness detection (finger distances)
- [x] Calculate hand tension (closed fist vs open palm)
- [x] Map hand state to particle scale/expansion

### Gesture-to-Particle Mapping
- [x] Closed hands → particles contract/shrink
- [x] Open hands → particles expand/grow
- [x] Hand movement → particles follow/react
- [x] Smooth interpolation for fluid response

### UI Components
- [x] Template selector panel (4 options)
- [x] Color selector with preset colors
- [x] Hand tracking status indicator
- [x] Clean, minimal header/footer

### Styling
- [x] Modern dark theme with gradients
- [x] Glass-morphism panels
- [x] Smooth transitions and hover effects
- [x] Responsive design

### Testing & Polish
- [x] Verify dual-hand tracking works
- [x] Test template switching
- [x] Ensure smooth particle response
- [x] Performance optimization

---

## Review

### Summary of Changes
Created `particle-system.html` - a complete 3D particle system with hand gesture control.

### Features Implemented

**Three.js 3D System:**
- 2000 particles rendered with buffer geometry for performance
- Additive blending for glowing effect
- Smooth rotation and organic movement animation
- Responsive canvas that adapts to window size

**4 Particle Templates:**
1. **Hearts** - Parametric heart equation, layered depth
2. **Flowers** - 6-petal pattern with curved z-depth
3. **Saturn** - Planet sphere + orbital ring
4. **Fireworks** - 5 burst centers with spherical distribution

**Dual-Hand Tracking:**
- MediaPipe configured for 2 hands (maxNumHands: 2)
- Hand openness calculated from fingertip-to-palm distances
- Hand state classification: open / closed / partial
- Left and right hand status displayed in real-time

**Gesture-to-Particle Mapping:**
- Closed hands → particles contract (scale: 0.5, expansion: 0.6)
- Open hands → particles expand (scale: 1.5, expansion: 1.8)
- Both hands → amplified effect (1.2x scale, 1.15x expansion)
- Smooth interpolation (0.1 for scale, 0.08 for expansion)

**UI Components:**
- Template selector grid (2x2)
- 8-color palette selector
- Hand state indicator showing left/right status
- Instructions panel with gesture guide
- Camera preview (bottom-right corner)

**Styling:**
- Inter font family for modern look
- Dark theme (#0a0a0f background)
- Glass-morphism panels with backdrop blur
- Purple/violet accent colors (#6366f1, #a855f7)
- Responsive layout for mobile

### Technical Notes
- Camera video mirrored for natural interaction
- MediaPipe hand labels are inverted (Right→Left due to mirror)
- Buffer geometry attributes updated each frame for smooth animation
- Particle sizes use sizeAttenuation for depth perception
