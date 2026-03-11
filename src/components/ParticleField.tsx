import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, basePositions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, base, sz];
  }, []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Attach mouse listener
  useThree(({ gl }) => {
    gl.domElement.addEventListener('pointermove', handlePointerMove);
    return () => gl.domElement.removeEventListener('pointermove', handlePointerMove);
  });

  useFrame((state) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;
    const mx = mousePos.current.x * viewport.width * 0.5;
    const my = mousePos.current.y * viewport.height * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Gentle floating motion
      const floatX = Math.sin(time * 0.3 + i * 0.1) * 0.15;
      const floatY = Math.cos(time * 0.2 + i * 0.15) * 0.15;

      // Mouse repulsion (gentle)
      const dx = bx + floatX - mx;
      const dy = by + floatY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3) * 0.8;
      const pushX = dx * influence * 0.3;
      const pushY = dy * influence * 0.3;

      posAttr.setXYZ(i, bx + floatX + pushX, by + floatY + pushY, bz);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.05;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.4 + i * 1.5) * 0.3;
      child.rotation.x = t * 0.1 * (i % 2 === 0 ? 1 : -1);
      child.rotation.z = t * 0.08 * (i % 3 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={group}>
      {/* Icosahedron */}
      <mesh position={[-4, 1, -3]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Octahedron */}
      <mesh position={[4.5, -1, -2]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Torus */}
      <mesh position={[-3, -2, -4]}>
        <torusGeometry args={[0.35, 0.12, 8, 24]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Dodecahedron */}
      <mesh position={[3, 2, -3.5]}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
