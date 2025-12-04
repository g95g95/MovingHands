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
- [ ] Create `particle-system.html` with base structure
- [ ] Add Three.js library for 3D rendering
- [ ] Add MediaPipe Hands for dual-hand tracking
- [ ] Set up responsive canvas with full viewport

### 3D Particle System Core
- [ ] Initialize Three.js scene, camera, renderer
- [ ] Create ParticleSystem class with configurable templates
- [ ] Implement particle buffer geometry for performance
- [ ] Add particle animation loop

### Particle Templates
- [ ] Hearts template - heart-shaped particle distribution
- [ ] Flowers template - petal/bloom pattern
- [ ] Saturn template - ring orbital pattern
- [ ] Fireworks template - explosion burst pattern

### Hand Tracking Integration
- [ ] Configure MediaPipe for dual-hand (maxNumHands: 2)
- [ ] Implement hand openness detection (finger distances)
- [ ] Calculate hand tension (closed fist vs open palm)
- [ ] Map hand state to particle scale/expansion

### Gesture-to-Particle Mapping
- [ ] Closed hands → particles contract/shrink
- [ ] Open hands → particles expand/grow
- [ ] Hand movement → particles follow/react
- [ ] Smooth interpolation for fluid response

### UI Components
- [ ] Template selector panel (4 options)
- [ ] Color selector with preset colors
- [ ] Hand tracking status indicator
- [ ] Clean, minimal header/footer

### Styling
- [ ] Modern dark theme with gradients
- [ ] Glass-morphism panels
- [ ] Smooth transitions and hover effects
- [ ] Responsive design

### Testing & Polish
- [ ] Verify dual-hand tracking works
- [ ] Test template switching
- [ ] Ensure smooth particle response
- [ ] Performance optimization

---

## Review
(To be completed after implementation)
