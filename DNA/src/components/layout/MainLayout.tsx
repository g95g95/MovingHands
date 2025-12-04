import { useState } from 'react';
import { Scene } from '../canvas/Scene';
import { HandTracker } from '../hand-tracking/HandTracker';
import { GestureIndicator } from '../ui/GestureIndicator';
import { ControlPanel } from '../ui/ControlPanel';

export function MainLayout() {
  const [cameraReady, setCameraReady] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 3D DNA Scene - Full screen background */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* Gesture Indicator */}
      <GestureIndicator />

      {/* Control Panel */}
      <ControlPanel />

      {/* Camera Feed - Picture in Picture */}
      <div className="absolute bottom-4 left-4 w-64 h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
        <HandTracker onCameraReady={() => setCameraReady(true)} />
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-2" />
              <span className="text-xs text-gray-400">Loading camera...</span>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="absolute top-4 right-4 text-right">
        <h1 className="text-xl font-bold text-white/90">DNA Navigator</h1>
        <p className="text-xs text-gray-400">Hand Gesture Control</p>
      </div>

      {/* Gesture Guide Button */}
      <button
        className="absolute top-4 left-1/2 -translate-x-1/2 bg-[var(--bg-panel)] backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-gray-300 border border-white/10 hover:border-white/30 transition-all"
        onClick={() => alert('Gesture Guide:\n\n✊ Closed Fist - Navigate\n🤏 Pinch - Select\n🖐️ Open Palm - Rotate\n👐 Two Hands - Zoom')}
      >
        ❓ Gesture Guide
      </button>
    </div>
  );
}
