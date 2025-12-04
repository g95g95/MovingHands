import { useEffect, useRef, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';
import type { Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { useGestureStore } from '../../stores/gestureStore';
import { DETECTION_CONFIDENCE, TRACKING_CONFIDENCE } from '../../constants/gestureThresholds';

interface HandTrackerProps {
  onCameraReady?: () => void;
}

export function HandTracker({ onCameraReady }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateHands = useGestureStore((state) => state.updateHands);

  const onResults = useCallback((results: Results) => {
    // Draw video to canvas for visual feedback
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mirror the video
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw hand landmarks
      if (results.multiHandLandmarks && results.multiHandedness) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];

          // Draw connections
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 2;

          // Draw points
          for (const landmark of landmarks) {
            const x = (1 - landmark.x) * canvas.width;
            const y = landmark.y * canvas.height;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#4ECDC4';
            ctx.fill();
          }
        }
      }
    }

    // Process hand data for gesture store
    let leftHand = null;
    let rightHand = null;

    if (results.multiHandLandmarks && results.multiHandedness) {
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const handedness = results.multiHandedness[i];
        const landmarks = results.multiHandLandmarks[i];

        // MediaPipe returns mirrored handedness, so Left is actually Right hand
        const handData = {
          landmarks,
          handedness: handedness.label as 'Left' | 'Right',
          confidence: handedness.score,
        };

        if (handedness.label === 'Left') {
          rightHand = handData; // Mirrored
        } else {
          leftHand = handData; // Mirrored
        }
      }
    }

    updateHands(leftHand, rightHand);
  }, [updateHands]);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: DETECTION_CONFIDENCE,
      minTrackingConfidence: TRACKING_CONFIDENCE,
    });

    hands.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await hands.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start().then(() => {
      onCameraReady?.();
    });

    return () => {
      camera.stop();
      hands.close();
    };
  }, [onResults, onCameraReady]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="hidden"
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
