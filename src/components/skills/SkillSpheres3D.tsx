import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { Text, AdaptiveDpr, AdaptiveEvents, Preload, Circle } from '@react-three/drei';
import * as THREE from 'three';

// All skills with white/green color scheme
const skillsData = [
  // Programming & Core
  { name: 'Python', color: '#22c55e' },
  { name: 'OOP', color: '#16a34a' },
  { name: 'DSA', color: '#15803d' },

  // Generative AI
  { name: 'GenAI', color: '#22c55e' },
  { name: 'LLMs', color: '#16a34a' },
  { name: 'RAG', color: '#15803d' },
  { name: 'Transformers', color: '#22c55e' },

  // Prompt Engineering
  { name: 'Prompt Eng', color: '#16a34a' },
  { name: 'Chain-of-Thought', color: '#15803d' },

  // Deep Learning
  { name: 'Deep Learning', color: '#22c55e' },
  { name: 'PyTorch', color: '#16a34a' },
  { name: 'TensorFlow', color: '#15803d' },
  { name: 'Neural Networks', color: '#22c55e' },
  { name: 'CNNs', color: '#16a34a' },

  // Machine Learning
  { name: 'Machine Learning', color: '#15803d' },
  { name: 'scikit-learn', color: '#22c55e' },
  { name: 'XGBoost', color: '#16a34a' },

  // NLP & Vision
  { name: 'NLP', color: '#15803d' },
  { name: 'Computer Vision', color: '#22c55e' },

  // Data & Analytics
  { name: 'Pandas', color: '#16a34a' },
  { name: 'NumPy', color: '#15803d' },

  // Backend & Tools
  { name: 'FastAPI', color: '#22c55e' },
  { name: 'PostgreSQL', color: '#16a34a' },
  { name: 'Git', color: '#15803d' },
  { name: 'Docker', color: '#22c55e' },
];

interface DraggableCircleProps {
  position: [number, number, number];
  skill: { name: string; color: string };
  radius: number;
}

// Invisible walls for collision
function Walls() {
  const { viewport } = useThree();

  // Floor
  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -viewport.height / 2 + 0.3, 0],
  }));

  // Ceiling
  usePlane(() => ({
    rotation: [Math.PI / 2, 0, 0],
    position: [0, viewport.height / 2 - 0.3, 0],
  }));

  // Left wall
  usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [-viewport.width / 2 + 0.3, 0, 0],
  }));

  // Right wall
  usePlane(() => ({
    rotation: [0, -Math.PI / 2, 0],
    position: [viewport.width / 2 - 0.3, 0, 0],
  }));

  // Back wall
  usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, -2],
  }));

  // Front wall
  usePlane(() => ({
    rotation: [0, Math.PI, 0],
    position: [0, 0, 2],
  }));

  return null;
}

// Individual draggable circle
function DraggableCircle({ position, skill, radius }: DraggableCircleProps) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [radius],
    linearDamping: 0.6,
    angularDamping: 0.8,
    material: {
      friction: 0.2,
      restitution: 0.7,
    },
  }));

  // Store velocity for throwing
  const velocity = useRef<[number, number, number]>([0, 0, 0]);
  const positionRef = useRef<[number, number, number]>([...position]);
  const prevMousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      positionRef.current = p as [number, number, number];
    });
    return unsubscribe;
  }, [api]);

  const handlePointerDown = useCallback((e: any) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setDragging(true);
    api.mass.set(0);
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  }, [api]);

  const handlePointerUp = useCallback((e: any) => {
    e.target.releasePointerCapture(e.pointerId);
    setDragging(false);
    api.mass.set(0.5);
    api.velocity.set(...velocity.current);
    velocity.current = [0, 0, 0];
    prevMousePos.current = null;
  }, [api]);

  const handlePointerMove = useCallback((e: any) => {
    if (!dragging) return;
    if (prevMousePos.current) {
      const deltaX = (e.clientX - prevMousePos.current.x) * 0.04;
      const deltaY = -(e.clientY - prevMousePos.current.y) * 0.04;
      const newX = positionRef.current[0] + deltaX;
      const newY = positionRef.current[1] + deltaY;
      api.position.set(newX, newY, positionRef.current[2]);
      velocity.current = [deltaX * 20, deltaY * 20, 0];
    }
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  }, [dragging, api]);

  // Animate glow and scale on hover
  useFrame(() => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.2 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
    if (glowRef.current) {
      const targetOpacity = hovered ? 0.5 : 0.15;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity,
        targetOpacity,
        0.1
      );
    }
  });

  return (
    <group ref={ref as any}>
      <group ref={groupRef}>
        {/* Outer glow ring */}
        <mesh ref={glowRef}>
          <circleGeometry args={[radius * 1.4, 64]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main white circle background */}
        <mesh
          onPointerOver={() => { setHovered(true); gl.domElement.style.cursor = 'grab'; }}
          onPointerOut={() => { setHovered(false); gl.domElement.style.cursor = 'auto'; }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          <circleGeometry args={[radius, 64]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>

        {/* Green border ring */}
        <mesh position={[0, 0, 0.001]}>
          <ringGeometry args={[radius * 0.92, radius, 64]} />
          <meshBasicMaterial color={skill.color} side={THREE.DoubleSide} />
        </mesh>

        {/* Skill name text - green on white */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={radius * 0.28}
          color={skill.color}
          anchorX="center"
          anchorY="middle"
          maxWidth={radius * 1.6}
          textAlign="center"
          fontWeight="bold"
        >
          {skill.name}
        </Text>
      </group>
    </group>
  );
}

// Main scene content
function Scene() {
  const { viewport } = useThree();

  // Calculate positions in a more spread out pattern
  const totalSkills = skillsData.length;
  const cols = Math.ceil(Math.sqrt(totalSkills * 1.5));
  const rows = Math.ceil(totalSkills / cols);

  const sphereRadius = Math.min(viewport.width / (cols + 2), viewport.height / (rows + 2)) * 0.45;
  const spacingX = viewport.width / (cols + 1);
  const spacingY = viewport.height / (rows + 1);

  const spherePositions = skillsData.map((_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    return [
      (col - (cols - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.3,
      ((rows - 1) / 2 - row) * spacingY + (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.5,
    ] as [number, number, number];
  });

  return (
    <Physics
      gravity={[0, -0.3, 0]}
      defaultContactMaterial={{
        friction: 0.2,
        restitution: 0.7,
      }}
    >
      <Walls />
      {skillsData.map((skill, index) => (
        <DraggableCircle
          key={skill.name}
          position={spherePositions[index]}
          skill={skill}
          radius={sphereRadius}
        />
      ))}
    </Physics>
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh rotation={[0, 0, Math.PI / 4]}>
      <ringGeometry args={[0.3, 0.4, 4]} />
      <meshBasicMaterial color="#22c55e" wireframe />
    </mesh>
  );
}

// Main component
export default function SkillSpheres3D() {
  return (
    <div className="relative w-full h-[650px] lg:h-[750px]">
      {/* Glassmorphism container */}
      <div className="absolute inset-0 glass-container-3d rounded-3xl overflow-hidden border-2 border-green-500/20">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <color attach="background" args={['transparent']} />

          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#22c55e" />

          <Suspense fallback={<Loader />}>
            <Scene />
            <Preload all />
          </Suspense>

          {/* Performance optimizations */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>

        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/30" />
      </div>

      {/* Decorative elements - green theme */}
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-green-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-8 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />
    </div>
  );
}
