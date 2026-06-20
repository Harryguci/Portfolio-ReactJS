import { useEffect, useRef, useState } from "react";

const LERP_FACTOR = 0.12;
const CENTER_UV = { x: 0.5, y: 0.5 };
const CENTER_PARALLAX = { x: 0, y: 0 };

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function useMousePosition() {
  const [mouse, setMouse] = useState(CENTER_PARALLAX);
  const [mouseNormalized, setMouseNormalized] = useState(CENTER_UV);
  const [isReducedMotion, setIsReducedMotion] = useState(getReducedMotionPreference);

  const targetRef = useRef({ ...CENTER_UV });
  const currentRef = useRef({ ...CENTER_UV });
  const frameRef = useRef(0);
  const reducedMotionRef = useRef(isReducedMotion);

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
        setMouse({ ...CENTER_PARALLAX });
        setMouseNormalized({ ...CENTER_UV });
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
    };

    const handlePointerMove = (event) => {
      updateTarget(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateTarget(touch.clientX, touch.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;

      if (document.visibilityState === "hidden") {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      if (reducedMotionRef.current) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * LERP_FACTOR;
      current.y += (target.y - current.y) * LERP_FACTOR;

      setMouseNormalized({ x: current.x, y: current.y });
      setMouse({
        x: current.x * 2 - 1,
        y: -(current.y * 2 - 1),
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { mouse, mouseNormalized, isReducedMotion };
}
