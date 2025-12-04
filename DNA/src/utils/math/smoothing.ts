/**
 * Exponential moving average for smooth transitions
 */
export function smoothValue(
  current: number,
  target: number,
  smoothing: number = 0.15
): number {
  return current + (target - current) * smoothing;
}

/**
 * Smooth a 3D vector
 */
export function smoothVector3(
  current: { x: number; y: number; z: number },
  target: { x: number; y: number; z: number },
  smoothing: number = 0.15
): { x: number; y: number; z: number } {
  return {
    x: smoothValue(current.x, target.x, smoothing),
    y: smoothValue(current.y, target.y, smoothing),
    z: smoothValue(current.z, target.z, smoothing),
  };
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
