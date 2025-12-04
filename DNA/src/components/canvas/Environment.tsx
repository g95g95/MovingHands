import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Environment() {
  const { scene } = useThree();

  useEffect(() => {
    // Set dark background
    scene.background = new THREE.Color('#0a0a0f');

    // Add fog for depth
    scene.fog = new THREE.Fog('#0a0a0f', 100, 500);
  }, [scene]);

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />

      {/* Main directional light */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        color="#ffffff"
      />

      {/* Accent colored lights */}
      <pointLight
        position={[-20, 10, -20]}
        intensity={0.5}
        color="#6366f1"
        distance={100}
      />
      <pointLight
        position={[20, -10, 20]}
        intensity={0.5}
        color="#4ECDC4"
        distance={100}
      />

      {/* Ground reference (optional grid) */}
      <gridHelper
        args={[200, 50, '#1a1a2e', '#1a1a2e']}
        position={[0, -100, 0]}
      />
    </>
  );
}
