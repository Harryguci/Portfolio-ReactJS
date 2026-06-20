export default function SkillIcon({ name, imgUrl }) {
  return (
    <div
      className="skill-icon group relative flex w-10 flex-col items-center gap-1"
      tabIndex={0}
      aria-label={name}
    >
      <div className="skill-icon__box software-icon glass-panel shrink-0 overflow-hidden p-1">
        <img
          src={imgUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <p
        aria-hidden="true"
        className="w-full truncate text-center font-mono text-[8px] uppercase leading-none text-on-surface-variant transition-opacity duration-200 group-hover:opacity-0"
      >
        {name}
      </p>

      <span
        role="tooltip"
        className="skill-icon__label pointer-events-none absolute left-1/2 top-[calc(100%-2px)] z-20 -translate-x-1/2 whitespace-nowrap rounded border border-neon-cyan/20 bg-surface/95 px-2 py-1 font-mono text-[8px] uppercase leading-none text-neon-cyan opacity-0 shadow-[0_0_16px_rgba(0,242,255,0.15)] backdrop-blur-sm transition-opacity duration-300 sm:text-[9px]"
      >
        {name}
      </span>
    </div>
  );
}
