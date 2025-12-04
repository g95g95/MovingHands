import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDNAStore } from '../../stores/dnaStore';
import { generateDNAParticles } from '../../utils/dna/helixGeometry';

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function DNAHelix() {
  const backboneRef = useRef<THREE.InstancedMesh>(null);
  const basesRef = useRef<THREE.InstancedMesh>(null);

  const { sequence, form, isAutoRotating, autoRotateSpeed, rotationOffset, expansionFactor } = useDNAStore();

  // Generate particle data
  const { backboneParticles, baseParticles } = useMemo(() => {
    return generateDNAParticles(sequence, form);
  }, [sequence, form]);

  // Set up instanced mesh matrices and colors
  useMemo(() => {
    if (!backboneRef.current || !basesRef.current) return;

    // Backbone particles
    backboneParticles.forEach((particle, i) => {
      tempObject.position.set(...particle.position);
      tempObject.scale.setScalar(0.8);
      tempObject.updateMatrix();
      backboneRef.current!.setMatrixAt(i, tempObject.matrix);
      tempColor.set(particle.color);
      backboneRef.current!.setColorAt(i, tempColor);
    });
    backboneRef.current.instanceMatrix.needsUpdate = true;
    if (backboneRef.current.instanceColor) {
      backboneRef.current.instanceColor.needsUpdate = true;
    }

    // Base particles
    baseParticles.forEach((particle, i) => {
      tempObject.position.set(...particle.position);
      tempObject.scale.setScalar(1.2);
      tempObject.updateMatrix();
      basesRef.current!.setMatrixAt(i, tempObject.matrix);
      tempColor.set(particle.color);
      basesRef.current!.setColorAt(i, tempColor);
    });
    basesRef.current.instanceMatrix.needsUpdate = true;
    if (basesRef.current.instanceColor) {
      basesRef.current.instanceColor.needsUpdate = true;
    }
  }, [backboneParticles, baseParticles]);

  // Animation loop
  useFrame((_state, delta) => {
    if (!backboneRef.current || !basesRef.current) return;

    // Auto rotation
    if (isAutoRotating) {
      backboneRef.current.rotation.y += delta * autoRotateSpeed;
      basesRef.current.rotation.y += delta * autoRotateSpeed;
    }

    // Apply manual rotation offset
    backboneRef.current.rotation.x = rotationOffset.x;
    basesRef.current.rotation.x = rotationOffset.x;
  });

  // Center the helix vertically
  const centerY = -(sequence.length * 3.4) / 2;

  return (
    <group position={[0, centerY, 0]} scale={[expansionFactor, 1, expansionFactor]}>
      {/* Backbone particles */}
      <instancedMesh
        ref={backboneRef}
        args={[undefined, undefined, backboneParticles.length]}
      >
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#444444"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.3}
        />
      </instancedMesh>

      {/* Base pair particles */}
      <instancedMesh
        ref={basesRef}
        args={[undefined, undefined, baseParticles.length]}
      >
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#222222"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
        />
      </instancedMesh>
    </group>
  );
}
