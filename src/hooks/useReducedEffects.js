import { useEffect, useState } from "react";

function readReducedEffects() {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const lowMemory =
    typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
  const lowCpu =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;

  return reducedMotion || saveData || lowMemory || (lowCpu && (coarsePointer || narrow));
}

/**
 * Detects weak devices / accessibility prefs that should disable heavy GPU effects.
 * Also toggles `data-reduced-effects` on <html> for CSS hooks.
 */
export default function useReducedEffects() {
  const [reducedEffects, setReducedEffects] = useState(readReducedEffects);

  useEffect(() => {
    const sync = () => {
      const next = readReducedEffects();
      setReducedEffects(next);
      document.documentElement.toggleAttribute("data-reduced-effects", next);
    };

    sync();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 768px)");
    const coarse = window.matchMedia("(pointer: coarse)");

    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    navigator.connection?.addEventListener?.("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      navigator.connection?.removeEventListener?.("change", sync);
    };
  }, []);

  return reducedEffects;
}
