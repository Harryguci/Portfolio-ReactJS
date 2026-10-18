import { useEffect, useRef, useState } from "react";

const LERP = 0.075;
const CENTER = { x: 0.5, y: 0.5 };

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ImmersiveBackground() {
  const glowRef = useRef(null);
  const targetRef = useRef({ ...CENTER });
  const currentRef = useRef({ ...CENTER });
  const frameRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onPointerMove = (event) => {
      targetRef.current = {
        x: Math.min(Math.max(event.clientX / window.innerWidth, 0), 1),
        y: Math.min(Math.max(event.clientY / window.innerHeight, 0), 1),
      };
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      targetRef.current = {
        x: Math.min(Math.max(touch.clientX / window.innerWidth, 0), 1),
        y: Math.min(Math.max(touch.clientY / window.innerHeight, 0), 1),
      };
    };

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const node = glowRef.current;
      if (node) {
        node.style.setProperty("--glow-x", `${(current.x * 100).toFixed(2)}%`);
        node.style.setProperty("--glow-y", `${(current.y * 100).toFixed(2)}%`);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [reducedMotion]);

  return (
    <>
      <div
        className="gradient-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="gradient-bg__base" />
        <div className="gradient-bg__orb gradient-bg__orb--a" />
        <div className="gradient-bg__orb gradient-bg__orb--b" />
        <div className="gradient-bg__orb gradient-bg__orb--c" />
        <div className="gradient-bg__veil" />
      </div>
      {!reducedMotion && (
        <div
          ref={glowRef}
          className="cursor-glow pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
          style={{
            "--glow-x": "50%",
            "--glow-y": "42%",
          }}
        >
          <span className="cursor-glow__aura" />
          <span className="cursor-glow__soft" />
          <span className="cursor-glow__core" />
        </div>
      )}
    </>
  );
}
