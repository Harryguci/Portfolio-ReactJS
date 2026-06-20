import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "PROFIL" },
  { id: "projects", label: "PROJECT" },
  { id: "contact", label: "CONTACT PERSON" },
];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter(Boolean);

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
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { activeSection, sections: SECTIONS };
}

export { SECTIONS };
