import { useDNAStore } from '../../stores/dnaStore';
import type { DNAForm } from '../../types/dna';

export function ControlPanel() {
  const { form, setForm, isAutoRotating, toggleAutoRotate, autoRotateSpeed, setAutoRotateSpeed } = useDNAStore();

  const forms: DNAForm[] = ['A', 'B', 'Z'];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--bg-panel)] backdrop-blur-md rounded-lg px-6 py-3 border border-white/10">
      <div className="flex items-center gap-6">
        {/* DNA Form Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase">Form:</span>
          <div className="flex gap-1">
            {forms.map((f) => (
              <button
                key={f}
                onClick={() => setForm(f)}
                className={`w-8 h-8 rounded text-sm font-bold transition-all ${
                  form === f
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20" />

        {/* Auto Rotate Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase">Rotate:</span>
          <button
            onClick={toggleAutoRotate}
            className={`px-3 py-1 rounded text-sm transition-all ${
              isAutoRotating
                ? 'bg-[var(--accent)] text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {isAutoRotating ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase">Speed:</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={autoRotateSpeed}
            onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))}
            className="w-20 accent-[var(--accent)]"
          />
        </div>
      </div>
    </div>
  );
}
