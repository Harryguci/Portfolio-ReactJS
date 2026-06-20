import { useEffect, useState } from "react";
import { MACOS_SECTIONS } from "../data/macosSections";

export default function useActiveSection(defaultSection = "header") {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const elements = MACOS_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: "-12% 0px -30% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
