import { useCallback, useEffect, useRef, useState } from "react";

const LERP_FACTOR = 0.12;
const IDLE_EPSILON = 0.0004;
const CENTER_UV = { x: 0.5, y: 0.5 };

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Parallax mouse tracking without React setState every frame.
 * Apply transforms by registering element updaters, or read mouseRef.current.
 */
export default function useMousePosition() {
  const [isReducedMotion, setIsReducedMotion] = useState(getReducedMotionPreference);

  const targetRef = useRef({ ...CENTER_UV });
  const currentRef = useRef({ ...CENTER_UV });
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const reducedMotionRef = useRef(isReducedMotion);
  const updatersRef = useRef(new Set());

  useEffect(() => {
    reducedMotionRef.current = isReducedMotion;
  }, [isReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (event) => {
      setIsReducedMotion(event.matches);
      if (event.matches) {
        targetRef.current = { ...CENTER_UV };
        currentRef.current = { ...CENTER_UV };
        mouseRef.current = { x: 0, y: 0 };
        updatersRef.current.forEach((fn) => fn(mouseRef.current));
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const updateTarget = (clientX, clientY) => {
      if (reducedMotionRef.current) return;

      const x = clientX / window.innerWidth;
      const y = 1 - clientY / window.innerHeight;

      targetRef.current = {
        x: Math.min(Math.max(x, 0), 1),
        y: Math.min(Math.max(y, 0), 1),
      };

      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (document.visibilityState === "hidden" || reducedMotionRef.current) {
        runningRef.current = false;
        return;
      }

      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * LERP_FACTOR;
      current.y += (target.y - current.y) * LERP_FACTOR;

      mouseRef.current = {
        x: current.x * 2 - 1,
        y: -(current.y * 2 - 1),
      };

      updatersRef.current.forEach((fn) => fn(mouseRef.current));

      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx < IDLE_EPSILON && dy < IDLE_EPSILON) {
        runningRef.current = false;
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event) => {
      updateTarget(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateTarget(touch.clientX, touch.clientY);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(frameRef.current);
        runningRef.current = false;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const subscribe = useCallback((updater) => {
    updatersRef.current.add(updater);
    updater(mouseRef.current);
    return () => {
      updatersRef.current.delete(updater);
    };
  }, []);

  return { mouseRef, subscribe, isReducedMotion };
}
