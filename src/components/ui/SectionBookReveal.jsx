import { useEffect, useRef } from "react";
import { emitSectionReveal } from "../../lib/sectionRevealBridge";

export default function SectionBookReveal({
  children,
  className = "",
  as: Tag = "section",
  immediate = false,
  ...rest
}) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    const inner = innerRef.current;
    if (!element || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finishAnimation = () => {
      element.classList.add("section-book-reveal--done");
      inner.style.willChange = "auto";
    };

    inner.addEventListener("animationend", finishAnimation, { once: true });

    const reveal = () => {
      if (hasRevealedRef.current) return;
      hasRevealedRef.current = true;

      requestAnimationFrame(() => {
        element.classList.add("section-book-reveal--active");

        if (!prefersReducedMotion) {
          emitSectionReveal({ element });
        } else {
          element.classList.add("section-book-reveal--done");
        }
      });
    };

    if (immediate || prefersReducedMotion) {
      reveal();
      return () => inner.removeEventListener("animationend", finishAnimation);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "120px 0px -4% 0px", threshold: 0.05 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      inner.removeEventListener("animationend", finishAnimation);
    };
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      className={`section-book-reveal ${className}`.trim()}
      data-book-reveal=""
      {...rest}
    >
      <div ref={innerRef} className="section-book-reveal__inner">
        {children}
      </div>
      <div className="section-book-reveal__edge" aria-hidden="true" />
    </Tag>
  );
}
