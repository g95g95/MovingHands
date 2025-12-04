import { useGestureStore } from '../../stores/gestureStore';

const gestureLabels: Record<string, { emoji: string; label: string }> = {
  idle: { emoji: '✋', label: 'Ready' },
  navigating: { emoji: '✊', label: 'Navigating' },
  zooming: { emoji: '👐', label: 'Zooming' },
  rotating: { emoji: '🖐️', label: 'Rotating' },
  selecting: { emoji: '🤏', label: 'Selecting' },
  expanding: { emoji: '🖐️', label: 'Expanding' },
  unwinding: { emoji: '✊✊', label: 'Unwinding' },
};

export function GestureIndicator() {
  const { currentGesture, leftHand, rightHand } = useGestureStore();

  const gesture = gestureLabels[currentGesture] || gestureLabels.idle;
  const handsDetected = (leftHand ? 1 : 0) + (rightHand ? 1 : 0);

  return (
    <div className="absolute top-4 left-4 bg-[var(--bg-panel)] backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{gesture.emoji}</span>
        <div>
          <div className="text-sm font-medium text-white">{gesture.label}</div>
          <div className="text-xs text-gray-400">
            {handsDetected === 0 ? 'No hands detected' : `${handsDetected} hand${handsDetected > 1 ? 's' : ''} detected`}
          </div>
        </div>
      </div>
    </div>
  );
}
