import { useEffect, useRef } from "react";
import siteData from "../../data/site.json";
import useMousePosition from "../../hooks/useMousePosition";
import GameMenuLink from "../ui/GameMenuLink";
import SectionBookReveal from "../ui/SectionBookReveal";

export default function HeroSection() {
  const { subscribe, isReducedMotion } = useMousePosition();
  const portraitRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) {
      if (portraitRef.current) portraitRef.current.style.transform = "";
      if (titleRef.current) titleRef.current.style.transform = "";
      return undefined;
    }

    return subscribe(({ x, y }) => {
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate(${x * 18}px, ${y * 12}px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
      }
    });
  }, [subscribe, isReducedMotion]);

  return (
    <SectionBookReveal
      id="hero"
      immediate
      className="flex min-h-screen flex-col justify-center pb-32 pt-20"
    >
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16">
        <div className="flex w-full max-w-full flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          <div
            className="relative flex shrink-0 justify-center"
            style={
              !isReducedMotion
                ? { perspective: "800px", transformStyle: "preserve-3d" }
                : undefined
            }
          >
            <div
              ref={portraitRef}
              className="relative"
              style={!isReducedMotion ? { willChange: "transform" } : undefined}
            >
              <div className="hero-portrait-glow absolute left-1/2 top-1/2 z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 sm:h-48 sm:w-48 lg:h-64 lg:w-64" />
              <img
                alt={siteData.fullName}
                className="relative z-10 h-40 w-40 rounded-full border-4 border-none object-cover shadow-2xl sm:h-48 sm:w-48 lg:h-64 lg:w-64"
                src={siteData.portrait}
                width={256}
                height={256}
                decoding="async"
                fetchpriority="high"
              />
            </div>
          </div>
          <div
            ref={titleRef}
            className="flex min-w-0 max-w-full flex-col items-center gap-2 text-center sm:gap-4 md:flex-row md:flex-wrap md:items-baseline md:justify-center lg:justify-start lg:text-left"
            style={!isReducedMotion ? { willChange: "transform" } : undefined}
          >
            <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-glow sm:text-6xl md:text-7xl lg:text-8xl">
              PORTFOLIO
            </h1>
            <span className="shrink-0 font-mono text-xl text-on-surface-variant md:text-3xl lg:text-4xl">
              {siteData.year}
            </span>
          </div>
        </div>

        <div className="z-10 flex w-full max-w-full flex-col items-center px-1 text-center">
          <div className="mb-10 mt-6 flex max-w-full items-center justify-center gap-3 sm:mb-12 sm:mt-8">
            <div className="h-2 w-2 shrink-0 rounded-full bg-ghost-white" />
            <span className="max-w-full break-words font-mono text-[11px] uppercase leading-relaxed tracking-widest sm:text-sm">
              {siteData.role}
            </span>
          </div>
          <nav className="mt-4 flex flex-col gap-5 font-mono text-lg uppercase tracking-widest sm:gap-6 sm:text-xl md:text-2xl">
            <GameMenuLink href="#about" active>
              Information
            </GameMenuLink>
            <GameMenuLink href="#projects">Projects</GameMenuLink>
            <GameMenuLink to="/blog">Blog</GameMenuLink>
            <GameMenuLink href="#contact">Contact</GameMenuLink>
          </nav>
        </div>
      </div>
    </SectionBookReveal>
  );
}
