import { useEffect, useRef } from "react";
import * as THREE from "three";
import useMousePosition from "../../hooks/useMousePosition";

const BG_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BG_FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouseStrength;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  vec3 navyDeep = vec3(0.075, 0.008, 0.239);
  vec3 navyBase = vec3(0.0, 0.075, 0.333);
  vec3 navyAccent = vec3(0.0, 0.212, 0.737);

  float wave = sin(uv.x * 2.0 + u_time * 0.2) * 0.5 + 0.5;
  wave *= cos(uv.y * 1.5 - u_time * 0.1) * 0.5 + 0.5;

  vec3 finalColor = mix(navyDeep, navyBase, wave * 0.25);
  finalColor = mix(finalColor, navyAccent, wave * 0.18);

  float n = noise(uv * 50.0 + u_time * 0.05);
  if (n > 0.995) {
    finalColor += navyAccent * 0.28;
  }

  float dist = distance(vUv, u_mouse);
  float mouseProximity = exp(-dist * 3.2) * u_mouseStrength;

  float cursorSparkle = noise(vUv * 80.0 - u_time * 0.08 + u_mouse * 2.0);
  if (cursorSparkle > 0.985 && mouseProximity > 0.06) {
    finalColor += navyAccent * mouseProximity * 0.75;
  }

  float coreGlow = exp(-dist * 12.5) * 0.62 * u_mouseStrength;
  float midGlow = exp(-dist * 6.2) * 0.38 * u_mouseStrength;
  float outerGlow = exp(-dist * 3.2) * 0.18 * u_mouseStrength;
  finalColor += navyAccent * coreGlow * 1.5;
  finalColor += navyAccent * midGlow;
  finalColor += navyAccent * outerGlow * 0.55;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const PARTICLE_VERTEX_SHADER = `
attribute float aScale;
attribute float aPhase;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseStrength;
uniform vec2 u_resolution;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec3 pos = position;

  float driftX = sin(u_time * 0.15 + aPhase) * 0.08;
  float driftY = cos(u_time * 0.12 + aPhase * 1.3) * 0.06;
  pos.x += driftX;
  pos.y += driftY;

  vec2 mouseOffset = (u_mouse - vec2(0.5)) * 0.45 * u_mouseStrength;
  pos.xy += mouseOffset * (0.35 + aPhase * 0.45);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float depth = 0.5 + aPhase * 0.5;
  float distToMouse = length(u_mouse - (pos.xy * 0.5 + 0.5));
  float mouseBoost = exp(-distToMouse * 2.8) * u_mouseStrength;

  gl_PointSize = aScale * depth * (200.0 / -mvPosition.z) * (1.0 + mouseBoost * 0.6);

  vAlpha = 0.15 + aPhase * 0.28 + mouseBoost * 0.42;
  vColor = mix(vec3(0.0, 0.212, 0.737), vec3(0.0, 0.075, 0.333), aPhase);
}
`;

const PARTICLE_FRAGMENT_SHADER = `
precision highp float;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;

  float strength = 1.0 - smoothstep(0.0, 0.5, dist);
  gl_FragColor = vec4(vColor, vAlpha * strength);
}
`;

function getParticleCount() {
  if (typeof window === "undefined") return 300;
  return window.innerWidth < 768 ? 120 : 300;
}

export default function ImmersiveBackground() {
  const containerRef = useRef(null);
  const { mouseNormalized, isReducedMotion } = useMousePosition();
  const mouseRef = useRef(mouseNormalized);
  const reducedMotionRef = useRef(isReducedMotion);

  useEffect(() => {
    mouseRef.current = mouseNormalized;
  }, [mouseNormalized]);

  useEffect(() => {
    reducedMotionRef.current = isReducedMotion;
  }, [isReducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    let scene;
    let camera;
    let bgMaterial;
    let particleMaterial;
    let particleGeometry;
    let frameId = 0;
    let running = true;
    let resizeObserver;
    let syncSize = () => {};

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x13023d, 0);
      renderer.domElement.className = "absolute inset-0 block h-full w-full";
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera.position.z = 1;

      bgMaterial = new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_mouseStrength: { value: 1 },
        },
        vertexShader: BG_VERTEX_SHADER,
        fragmentShader: BG_FRAGMENT_SHADER,
        depthWrite: false,
      });

      const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
      scene.add(bgPlane);

      const particleCount = getParticleCount();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);
      const phases = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 2.4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
        positions[i * 3 + 2] = Math.random() * 0.5;
        scales[i] = 1.5 + Math.random() * 2.5;
        phases[i] = Math.random();
      }

      particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeometry.setAttribute(
        "aScale",
        new THREE.BufferAttribute(scales, 1)
      );
      particleGeometry.setAttribute(
        "aPhase",
        new THREE.BufferAttribute(phases, 1)
      );

      particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_mouseStrength: { value: 1 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader: PARTICLE_VERTEX_SHADER,
        fragmentShader: PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      syncSize = () => {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        bgMaterial.uniforms.u_resolution.value.set(width, height);
        particleMaterial.uniforms.u_resolution.value.set(width, height);
      };

      syncSize();
      resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(syncSize)
          : null;
      resizeObserver?.observe(container);
      window.addEventListener("resize", syncSize);

      const render = (t) => {
        if (!running) return;

        if (document.visibilityState === "hidden") {
          frameId = requestAnimationFrame(render);
          return;
        }

        const time = t * 0.001;
        const mouse = mouseRef.current;
        const strength = reducedMotionRef.current ? 0 : 1;

        bgMaterial.uniforms.u_time.value = time;
        bgMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
        bgMaterial.uniforms.u_mouseStrength.value = strength;

        particleMaterial.uniforms.u_time.value = time;
        particleMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
        particleMaterial.uniforms.u_mouseStrength.value = strength;

        if (!resizeObserver) syncSize();
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(render);
      };

      frameId = requestAnimationFrame(render);
    } catch {
      if (renderer?.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      return () => {};
    }

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncSize);

      bgMaterial?.dispose();
      particleMaterial?.dispose();
      particleGeometry?.dispose();
      scene?.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
      });
      renderer?.dispose();

      if (renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const cursorX = mouseNormalized.x * 100;
  const cursorY = (1 - mouseNormalized.y) * 100;

  const mouseSpotlightStyle =
    !isReducedMotion
      ? {
          background: `
            radial-gradient(80px circle at ${cursorX}% ${cursorY}%, rgba(0, 54, 188, 0.72) 0%, rgba(0, 54, 188, 0.35) 40%, transparent 100%),
            radial-gradient(190px circle at ${cursorX}% ${cursorY}%, rgba(0, 54, 188, 0.5) 0%, rgba(0, 19, 85, 0.15) 50%, transparent 100%),
            radial-gradient(480px circle at ${cursorX}% ${cursorY}%, rgba(0, 54, 188, 0.22) 0%, rgba(19, 2, 61, 0.1) 55%, transparent 78%)
          `,
        }
      : undefined;

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30 shader-fallback"
        aria-hidden="true"
      />
      {!isReducedMotion && (
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
          style={mouseSpotlightStyle}
        />
      )}
    </>
  );
}
