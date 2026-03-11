import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════
   NEURAL NETWORK / DATA FLOW GLSL SHADER

   A full-screen fragment shader that renders an animated neural
   network-like particle field with flowing connections. Uses ONLY
   black, white, and electric cyan (#00F0FF).

   Reacts to mouse position for subtle interactive parallax.

   ── HOW TO CUSTOMIZE ──
   Replace the fragmentShader string below with any Shadertoy-style
   GLSL code. The uniforms iTime, iResolution, and iMouse are
   already wired up and match the Shadertoy convention.
   ═══════════════════════════════════════════════════════════════════ */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Neural network data-flow shader
const fragmentShader = `
  precision highp float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;

  varying vec2 vUv;

  // ── Noise functions ──
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val += amp * noise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  // ── Neural node glow ──
  float nodeGlow(vec2 uv, vec2 center, float radius) {
    float d = length(uv - center);
    return smoothstep(radius, 0.0, d) * exp(-d * 8.0);
  }

  // ── Connection line between two points ──
  float connectionLine(vec2 uv, vec2 a, vec2 b, float width) {
    vec2 pa = uv - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float d = length(pa - ba * h);
    return smoothstep(width, 0.0, d);
  }

  // ── Data pulse along connection ──
  float dataPulse(vec2 uv, vec2 a, vec2 b, float t, float speed) {
    vec2 ba = b - a;
    vec2 pa = uv - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float pulse = fract(h - t * speed);
    pulse = exp(-pow(pulse - 0.5, 2.0) * 40.0);
    float d = length(pa - ba * h);
    return pulse * smoothstep(0.004, 0.0, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 aspect = vec2(iResolution.x / iResolution.y, 1.0);
    vec2 uvA = uv * aspect;

    // Mouse influence (normalized 0-1)
    vec2 mouse = iMouse / iResolution;
    vec2 mouseOffset = (mouse - 0.5) * 0.08;

    float t = iTime * 0.3;

    // ── Background: deep black with subtle noise ──
    float bgNoise = fbm(uv * 3.0 + t * 0.1) * 0.03;
    vec3 col = vec3(bgNoise);

    // ── Generate neural network nodes ──
    // Layer 1 (input layer)
    const int NODES_L1 = 5;
    vec2 nodesL1[5];
    nodesL1[0] = vec2(0.15, 0.15);
    nodesL1[1] = vec2(0.15, 0.35);
    nodesL1[2] = vec2(0.15, 0.50);
    nodesL1[3] = vec2(0.15, 0.65);
    nodesL1[4] = vec2(0.15, 0.85);

    // Layer 2 (hidden layer 1)
    const int NODES_L2 = 6;
    vec2 nodesL2[6];
    nodesL2[0] = vec2(0.38, 0.10);
    nodesL2[1] = vec2(0.38, 0.27);
    nodesL2[2] = vec2(0.38, 0.42);
    nodesL2[3] = vec2(0.38, 0.57);
    nodesL2[4] = vec2(0.38, 0.73);
    nodesL2[5] = vec2(0.38, 0.90);

    // Layer 3 (hidden layer 2)
    const int NODES_L3 = 6;
    vec2 nodesL3[6];
    nodesL3[0] = vec2(0.62, 0.10);
    nodesL3[1] = vec2(0.62, 0.27);
    nodesL3[2] = vec2(0.62, 0.42);
    nodesL3[3] = vec2(0.62, 0.57);
    nodesL3[4] = vec2(0.62, 0.73);
    nodesL3[5] = vec2(0.62, 0.90);

    // Layer 4 (output layer)
    const int NODES_L4 = 3;
    vec2 nodesL4[3];
    nodesL4[0] = vec2(0.85, 0.30);
    nodesL4[1] = vec2(0.85, 0.50);
    nodesL4[2] = vec2(0.85, 0.70);

    // Apply mouse offset and subtle animation to all nodes
    for (int i = 0; i < NODES_L1; i++) {
      nodesL1[i] += mouseOffset + vec2(0.0, sin(t + float(i) * 1.3) * 0.015);
    }
    for (int i = 0; i < NODES_L2; i++) {
      nodesL2[i] += mouseOffset * 0.8 + vec2(sin(t * 0.7 + float(i)) * 0.01, cos(t + float(i) * 0.9) * 0.012);
    }
    for (int i = 0; i < NODES_L3; i++) {
      nodesL3[i] += mouseOffset * 0.6 + vec2(sin(t * 0.8 + float(i) * 1.1) * 0.01, cos(t * 0.6 + float(i)) * 0.012);
    }
    for (int i = 0; i < NODES_L4; i++) {
      nodesL4[i] += mouseOffset * 0.4 + vec2(0.0, sin(t * 0.9 + float(i) * 1.5) * 0.015);
    }

    // ── Draw connections (L1 -> L2) ──
    for (int i = 0; i < NODES_L1; i++) {
      for (int j = 0; j < NODES_L2; j++) {
        float line = connectionLine(uv, nodesL1[i], nodesL2[j], 0.001);
        float pulse = dataPulse(uv, nodesL1[i], nodesL2[j], t, 0.4 + float(i) * 0.05);
        col += vec3(0.08, 0.10, 0.12) * line * 0.4;
        col += vec3(0.0, 0.94, 1.0) * pulse * 0.5;
      }
    }

    // ── Draw connections (L2 -> L3) ──
    for (int i = 0; i < NODES_L2; i++) {
      for (int j = 0; j < NODES_L3; j++) {
        float line = connectionLine(uv, nodesL2[i], nodesL3[j], 0.001);
        float pulse = dataPulse(uv, nodesL2[i], nodesL3[j], t + 1.0, 0.35 + float(j) * 0.04);
        col += vec3(0.08, 0.10, 0.12) * line * 0.35;
        col += vec3(0.0, 0.94, 1.0) * pulse * 0.45;
      }
    }

    // ── Draw connections (L3 -> L4) ──
    for (int i = 0; i < NODES_L3; i++) {
      for (int j = 0; j < NODES_L4; j++) {
        float line = connectionLine(uv, nodesL3[i], nodesL4[j], 0.001);
        float pulse = dataPulse(uv, nodesL3[i], nodesL4[j], t + 2.0, 0.45 + float(i) * 0.03);
        col += vec3(0.08, 0.10, 0.12) * line * 0.35;
        col += vec3(0.0, 0.94, 1.0) * pulse * 0.5;
      }
    }

    // ── Draw nodes with glow ──
    for (int i = 0; i < NODES_L1; i++) {
      float glow = nodeGlow(uv, nodesL1[i], 0.02);
      float pulse = 0.5 + 0.5 * sin(t * 2.0 + float(i) * 1.2);
      col += vec3(0.0, 0.94, 1.0) * glow * (0.6 + pulse * 0.4);
      col += vec3(1.0) * glow * glow * 0.3;
    }
    for (int i = 0; i < NODES_L2; i++) {
      float glow = nodeGlow(uv, nodesL2[i], 0.018);
      float pulse = 0.5 + 0.5 * sin(t * 2.0 + float(i) * 0.9 + 1.0);
      col += vec3(0.0, 0.94, 1.0) * glow * (0.5 + pulse * 0.5);
      col += vec3(1.0) * glow * glow * 0.25;
    }
    for (int i = 0; i < NODES_L3; i++) {
      float glow = nodeGlow(uv, nodesL3[i], 0.018);
      float pulse = 0.5 + 0.5 * sin(t * 2.0 + float(i) * 1.1 + 2.0);
      col += vec3(0.0, 0.94, 1.0) * glow * (0.5 + pulse * 0.5);
      col += vec3(1.0) * glow * glow * 0.25;
    }
    for (int i = 0; i < NODES_L4; i++) {
      float glow = nodeGlow(uv, nodesL4[i], 0.022);
      float pulse = 0.5 + 0.5 * sin(t * 2.0 + float(i) * 1.4 + 3.0);
      col += vec3(0.0, 0.94, 1.0) * glow * (0.7 + pulse * 0.3);
      col += vec3(1.0) * glow * glow * 0.35;
    }

    // ── Floating particles / data dust ──
    for (int i = 0; i < 30; i++) {
      float fi = float(i);
      vec2 particlePos = vec2(
        fract(hash(vec2(fi, 0.0)) + t * (0.02 + hash(vec2(fi, 1.0)) * 0.03)),
        fract(hash(vec2(fi, 2.0)) + t * (0.01 + hash(vec2(fi, 3.0)) * 0.02))
      );
      particlePos += mouseOffset * (0.2 + hash(vec2(fi, 4.0)) * 0.3);
      float size = 0.001 + hash(vec2(fi, 5.0)) * 0.002;
      float brightness = 0.3 + 0.3 * sin(t * 3.0 + fi * 0.7);
      float d = length(uv - particlePos);
      float particle = smoothstep(size, 0.0, d);
      col += vec3(0.0, 0.94, 1.0) * particle * brightness * 0.5;
    }

    // ── Subtle radial vignette ──
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.4);
    col *= vignette;

    // ── Film grain ──
    float grain = hash(uv * iTime) * 0.02;
    col += grain;

    // Clamp output
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Inner shader mesh that fills the viewport.
 * Receives mouse coordinates from the parent and pipes them
 * into the GLSL uniforms each frame.
 */
function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iMouse: { value: new THREE.Vector2(size.width * 0.5, size.height * 0.5) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Track mouse across the viewport
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(e.clientX, size.height - e.clientY);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [size.height]);

  // Update resolution on resize
  useEffect(() => {
    uniforms.iResolution.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms.iResolution.value]);

  useFrame((_, delta) => {
    uniforms.iTime.value += delta;
    uniforms.iMouse.value.lerp(mouseRef.current, 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/**
 * ShaderBackground
 *
 * A fixed, full-viewport WebGL canvas that renders the neural
 * network GLSL shader. Mount this once in your layout; it sits
 * behind all other content via z-index.
 */
export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#080808' }}>
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}
