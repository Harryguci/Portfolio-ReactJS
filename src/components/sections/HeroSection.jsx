import siteData from "../../data/site.json";
import useMousePosition from "../../hooks/useMousePosition";
import GameMenuLink from "../ui/GameMenuLink";
import SectionBookReveal from "../ui/SectionBookReveal";

export default function HeroSection() {
  const { mouse, isReducedMotion } = useMousePosition();

  const portraitStyle =
    !isReducedMotion
      ? {
          transform: `translate(${mouse.x * 18}px, ${mouse.y * 12}px) rotateY(${mouse.x * 3}deg) rotateX(${-mouse.y * 3}deg)`,
          willChange: "transform",
        }
      : undefined;

  const titleStyle =
    !isReducedMotion
      ? {
          transform: `translate(${mouse.x * -12}px, ${mouse.y * -8}px)`,
          willChange: "transform",
        }
      : undefined;

  return (
    <SectionBookReveal
      id="hero"
      immediate
      className="flex min-h-screen flex-col justify-center pb-32 pt-20"
    >
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          <div
            className="relative flex shrink-0 justify-center"
            style={
              !isReducedMotion
                ? { perspective: "800px", transformStyle: "preserve-3d" }
                : undefined
            }
          >
            <div className="relative" style={portraitStyle}>
              <div className="absolute left-1/2 top-1/2 z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl md:h-64 md:w-64" />
              <img
                alt={siteData.fullName}
                className="relative z-10 h-48 w-48 rounded-full border-4 border-none object-cover shadow-2xl md:h-64 md:w-64"
                src={siteData.portrait}
              />
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-4 text-center md:flex-row md:items-baseline md:text-left"
            style={titleStyle}
          >
            <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-glow md:text-7xl lg:text-8xl">
              PORTFOLIO
            </h1>
            <span className="font-mono text-xl text-on-surface-variant md:text-4xl">
              {siteData.year}
            </span>
          </div>
        </div>

        <div className="z-10 flex w-full flex-col items-center text-center">
          <div className="mb-12 mt-8 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-ghost-white" />
            <span className="font-mono text-sm uppercase tracking-widest">
              {siteData.role}
            </span>
          </div>
          <nav className="mt-4 flex flex-col gap-6 font-mono text-xl uppercase tracking-widest md:text-2xl">
            <GameMenuLink href="#about" active>
              Information
            </GameMenuLink>
            <GameMenuLink href="#projects">Projects</GameMenuLink>
            <GameMenuLink href="#contact">Contact</GameMenuLink>
          </nav>
        </div>
      </div>
    </SectionBookReveal>
  );
}
