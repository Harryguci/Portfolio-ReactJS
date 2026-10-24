import { useEffect, useRef } from "react";
import useReducedEffects from "../../hooks/useReducedEffects";

const LERP = 0.075;
const IDLE_EPSILON = 0.00035;
const CENTER = { x: 0.5, y: 0.5 };

export default function ImmersiveBackground() {
  const glowRef = useRef(null);
  const targetRef = useRef({ ...CENTER });
  const currentRef = useRef({ ...CENTER });
  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const reducedEffects = useReducedEffects();

  useEffect(() => {
    if (reducedEffects) return undefined;

    const onPointerMove = (event) => {
      targetRef.current = {
        x: Math.min(Math.max(event.clientX / window.innerWidth, 0), 1),
        y: Math.min(Math.max(event.clientY / window.innerHeight, 0), 1),
      };
      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      targetRef.current = {
        x: Math.min(Math.max(touch.clientX / window.innerWidth, 0), 1),
        y: Math.min(Math.max(touch.clientY / window.innerHeight, 0), 1),
      };
      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (document.visibilityState === "hidden") {
        runningRef.current = false;
        return;
      }

      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const node = glowRef.current;
      if (node) {
        node.style.setProperty("--glow-x", `${(current.x * 100).toFixed(2)}%`);
        node.style.setProperty("--glow-y", `${(current.y * 100).toFixed(2)}%`);
      }

      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx < IDLE_EPSILON && dy < IDLE_EPSILON) {
        runningRef.current = false;
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(frameRef.current);
        runningRef.current = false;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedEffects]);

  return (
    <>
      <div
        className="gradient-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="gradient-bg__base" />
        <div className="gradient-bg__orb gradient-bg__orb--a" />
        <div className="gradient-bg__orb gradient-bg__orb--b" />
        {!reducedEffects && (
          <div className="gradient-bg__orb gradient-bg__orb--c" />
        )}
        <div className="gradient-bg__veil" />
      </div>
      {!reducedEffects && (
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
