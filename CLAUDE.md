# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

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

Project Overview
Hand Sculpt is a browser-based hand-tracking application that allows users to create and manipulate geometric shapes using hand gestures captured via webcam. The app uses MediaPipe Hands for real-time hand landmark detection and HTML5 Canvas for rendering.
Tech Stack

Vanilla JavaScript (ES6+) - No build tools required
HTML5 Canvas - Dual canvas system (hand visualization + shape rendering)
MediaPipe Hands - Hand landmark detection (21 points per hand)
MediaPipe Camera Utils - Webcam stream handling
CSS3 - Custom properties, animations, backdrop-filter

Architecture
Single-file HTML application
├── Styles (embedded <style>)
├── HTML structure
│   ├── Loading overlay
│   ├── Header (logo + status)
│   ├── Canvas wrapper
│   │   ├── Video element (webcam feed, mirrored)
│   │   ├── Hand canvas (landmark visualization)
│   │   └── Draw canvas (shapes)
│   ├── Side panel (shape/color selection)
│   ├── Instructions panel (gesture guide)
│   └── Action buttons (undo/clear/save)
└── JavaScript (embedded <script>)
    ├── State management
    ├── Shape class
    ├── Gesture detection
    ├── MediaPipe initialization
    └── UI event handlers
Key Concepts
Coordinate System

Video feed is mirrored (transform: scaleX(-1)) for natural interaction
Canvas coordinates are also mirrored: x = (1 - landmark.x) * canvas.width
Landmark coordinates from MediaPipe are normalized (0-1 range)

Gesture Detection Logic
Located in detectGesture(landmarks) function. Uses landmark positions to detect:
GestureDetection MethodActionPoint (☝️)Index finger up, others downCreate shapePinch (🤏)Thumb-index distance < 0.06Resize shapeOpen (✋)All fingers extendedDrag shapePeace (✌️)Index + middle up, others downRotate shape
Landmark Indices (MediaPipe)
Thumb:  0-4   (tip = 4)
Index:  5-8   (tip = 8)
Middle: 9-12  (tip = 12)
Ring:   13-16 (tip = 16)
Pinky:  17-20 (tip = 20)
Shape Class
javascriptclass Shape {
  constructor(type, x, y, color, size = 60)
  // Properties: type, x, y, color, size, rotation, points[]
  // Methods: draw(ctx), contains(x, y)
}
Supported types: circle, rectangle, triangle, star, line
State Variables
javascriptshapes[]              // Array of Shape objects
history[]             // Undo stack (JSON serialized states)
currentShape          // Selected shape type
currentColor          // Selected color (hex)
selectedShapeIndex    // Currently manipulated shape (-1 = none)
lastGesture           // Previous gesture for change detection
gestureStartTime      // Timestamp for gesture duration
freeDrawPoints[]      // Points for free-line drawing
Common Tasks
Adding a New Shape Type

Add button in .shape-buttons div
Add SVG icon for the button
Add case in Shape.draw() method
Handle any special logic (like line type uses points[])

Adding a New Gesture

Add detection logic in detectGesture() return object
Handle gesture in hands.onResults() switch statement
Add visual feedback in gesture indicator
Update instructions panel

Modifying Gesture Sensitivity

minDetectionConfidence: 0.7 (lower = more detections, more noise)
minTrackingConfidence: 0.7 (lower = smoother but less accurate)
Pinch threshold: 0.06 (normalized distance)
Finger "up" threshold: tip.y < mcp.y - 0.05

Styling Conventions
CSS Variables (defined in :root)
css--neon-cyan: #00f5ff
--neon-magenta: #ff00ff
--neon-yellow: #f0ff00
--bg-dark: #0a0a12
--bg-panel: rgba(15, 15, 25, 0.85)
--glow-cyan: 0 0 20px rgba(0, 245, 255, 0.5)
--glow-magenta: 0 0 20px rgba(255, 0, 255, 0.5)
Design System

Font families: Orbitron (headings/UI), Exo 2 (body)
Border radius: 10-20px for panels, 8px for small elements
Glow effects via box-shadow and canvas shadowBlur
Backdrop blur: 20px for glass-morphism panels

Performance Considerations

MediaPipe runs at ~30fps depending on hardware
Canvas clearing and redrawing happens every frame for hand visualization
Shape canvas only redraws on state changes (redraw() function)
History limited to 50 states to prevent memory issues

Browser Requirements

WebRTC support (getUserMedia)
ES6+ JavaScript
CSS backdrop-filter (graceful degradation without it)
Tested on: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+

Known Limitations

Single hand tracking only (maxNumHands: 1)
No persistence (shapes lost on page reload)
Mobile browsers may have performance issues
Side panels hidden on screens < 1024px width

Development Commands
No build process required. To develop:
bash# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000/hand-sculpt.html
Future Enhancement Ideas

 Multi-hand support for two-handed gestures
 LocalStorage persistence for shapes
 Import/export as JSON
 More shape types (polygon, bezier curves)
 Shape grouping and layering
 Color picker with custom colors
 Undo/redo keyboard shortcuts (Ctrl+Z)
 Touch fallback for mobile devices
 WebGL renderer for better performance
