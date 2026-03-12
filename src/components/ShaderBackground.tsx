import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════
   SEASCAPE GLSL SHADER BACKGROUND

   Based on "Seascape" by Alexander Alekseev (TDM), 2014.
   Adapted with a dark cyan palette to match portfolio theme.

   Reacts to mouse position for camera control.
   ═══════════════════════════════════════════════════════════════════ */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Seascape shader — based on "Seascape" by Alexander Alekseev (TDM), 2014
// Adapted with dark cyan palette to match portfolio theme
const fragmentShader = `
  precision highp float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;

  varying vec2 vUv;

  const int NUM_STEPS = 32;
  const float PI = 3.141592;
  const float EPSILON = 1e-3;
  #define EPSILON_NRM (0.1 / iResolution.x)

  // sea parameters
  const int ITER_GEOMETRY = 3;
  const int ITER_FRAGMENT = 5;
  const float SEA_HEIGHT = 0.6;
  const float SEA_CHOPPY = 4.0;
  const float SEA_SPEED = 0.8;
  const float SEA_FREQ = 0.16;
  // Dark cyan-tinted base & water color to match #00F0FF theme
  const vec3 SEA_BASE = vec3(0.0, 0.06, 0.12);
  const vec3 SEA_WATER_COLOR = vec3(0.0, 0.55, 0.65);
  #define SEA_TIME (1.0 + iTime * SEA_SPEED)
  const mat2 octave_m = mat2(1.6, 1.2, -1.2, 1.6);

  // math
  mat3 fromEuler(vec3 ang) {
    vec2 a1 = vec2(sin(ang.x), cos(ang.x));
    vec2 a2 = vec2(sin(ang.y), cos(ang.y));
    vec2 a3 = vec2(sin(ang.z), cos(ang.z));
    mat3 m;
    m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x, a1.y*a2.x*a3.x+a3.y*a1.x, -a2.y*a3.x);
    m[1] = vec3(-a2.y*a1.x, a1.y*a2.y, a2.x);
    m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x, a1.x*a3.x-a1.y*a3.y*a2.x, a2.y*a3.y);
    return m;
  }

  float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // lighting
  float diffuse(vec3 n, vec3 l, float p) {
    return pow(dot(n, l) * 0.4 + 0.6, p);
  }

  float specular(vec3 n, vec3 l, vec3 e, float s) {
    float nrm = (s + 8.0) / (PI * 8.0);
    return pow(max(dot(reflect(e, n), l), 0.0), s) * nrm;
  }

  // sky — dark gradient with subtle cyan glow
  vec3 getSkyColor(vec3 e) {
    e.y = (max(e.y, 0.0) * 0.8 + 0.2) * 0.8;
    return vec3(0.0, pow(1.0 - e.y, 3.0) * 0.15, pow(1.0 - e.y, 2.0) * 0.25) * 1.4;
  }

  // sea octave
  float sea_octave(vec2 uv, float choppy) {
    uv += noise(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 swv = abs(cos(uv));
    wv = mix(wv, swv, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  float map(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    float d, h = 0.0;
    for (int i = 0; i < ITER_GEOMETRY; i++) {
      d = sea_octave((uv + SEA_TIME) * freq, choppy);
      d += sea_octave((uv - SEA_TIME) * freq, choppy);
      h += d * amp;
      uv *= octave_m; freq *= 1.9; amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }
    return p.y - h;
  }

  float map_detailed(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    float d, h = 0.0;
    for (int i = 0; i < ITER_FRAGMENT; i++) {
      d = sea_octave((uv + SEA_TIME) * freq, choppy);
      d += sea_octave((uv - SEA_TIME) * freq, choppy);
      h += d * amp;
      uv *= octave_m; freq *= 1.9; amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }
    return p.y - h;
  }

  vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
    float fresnel = clamp(1.0 - dot(n, -eye), 0.0, 1.0);
    fresnel = min(fresnel * fresnel * fresnel, 0.5);
    vec3 reflected = getSkyColor(reflect(eye, n));
    vec3 refracted = SEA_BASE + diffuse(n, l, 80.0) * SEA_WATER_COLOR * 0.12;
    vec3 color = mix(refracted, reflected, fresnel);
    float atten = max(1.0 - dot(dist, dist) * 0.001, 0.0);
    color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
    // Cyan-tinted specular highlights
    color += vec3(0.0, 0.94, 1.0) * specular(n, l, eye, 600.0 * inversesqrt(dot(dist, dist))) * 0.6;
    return color;
  }

  // tracing
  vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.y = map_detailed(p);
    n.x = map_detailed(vec3(p.x + eps, p.y, p.z)) - n.y;
    n.z = map_detailed(vec3(p.x, p.y, p.z + eps)) - n.y;
    n.y = eps;
    return normalize(n);
  }

  float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
    float tm = 0.0;
    float tx = 1000.0;
    float hx = map(ori + dir * tx);
    if (hx > 0.0) {
      p = ori + dir * tx;
      return tx;
    }
    float hm = map(ori);
    for (int i = 0; i < NUM_STEPS; i++) {
      float tmid = mix(tm, tx, hm / (hm - hx));
      p = ori + dir * tmid;
      float hmid = map(p);
      if (hmid < 0.0) {
        tx = tmid;
        hx = hmid;
      } else {
        tm = tmid;
        hm = hmid;
      }
      if (abs(hmid) < EPSILON) break;
    }
    return mix(tm, tx, hm / (hm - hx));
  }

  vec3 getPixel(in vec2 coord, float time) {
    vec2 uv = coord / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // ray
    vec3 ang = vec3(sin(time * 3.0) * 0.1, sin(time) * 0.2 + 0.3, time);
    vec3 ori = vec3(0.0, 3.5, time * 5.0);
    vec3 dir = normalize(vec3(uv.xy, -2.0));
    dir.z += length(uv) * 0.14;
    dir = normalize(dir) * fromEuler(ang);

    // tracing
    vec3 p;
    heightMapTracing(ori, dir, p);
    vec3 dist = p - ori;
    vec3 n = getNormal(p, dot(dist, dist) * EPSILON_NRM);
    vec3 light = normalize(vec3(0.0, 1.0, 0.8));

    // color
    return mix(
      getSkyColor(dir),
      getSeaColor(p, n, light, dir, dist),
      pow(smoothstep(0.0, -0.02, dir.y), 0.2));
  }

  void main() {
    float time = iTime * 0.3 + iMouse.x * 0.01;
    vec3 color = getPixel(gl_FragCoord.xy, time);

    // Darken overall to blend with dark portfolio background
    color *= 0.85;

    // post processing
    gl_FragColor = vec4(pow(color, vec3(0.65)), 1.0);
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
 * A fixed, full-viewport WebGL canvas that renders the seascape
 * GLSL shader. Mount this once in your layout; it sits behind
 * all other content via z-index.
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
