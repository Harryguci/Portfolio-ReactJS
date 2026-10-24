import SafeImage from "./SafeImage";
import { DEFAULT_SKILL_ICON } from "../../constants/assets";

function monogram(name) {
  const parts = String(name)
    .replace(/[^a-zA-Z0-9.+#\s-]/g, " ")
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function SkillIcon({ name, imgUrl }) {
  const useImage = Boolean(imgUrl);

  return (
    <div
      className="skill-icon group relative flex w-10 flex-col items-center gap-1"
      tabIndex={0}
      aria-label={name}
    >
      <div className="skill-icon__box software-icon glass-panel flex shrink-0 items-center justify-center overflow-hidden p-1">
        {useImage ? (
          <SafeImage
            src={imgUrl}
            fallback={DEFAULT_SKILL_ICON}
            alt={name}
            loading="lazy"
            decoding="async"
            width={32}
            height={32}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="select-none font-mono text-[9px] font-bold leading-none tracking-tight text-neon-cyan/90">
            {monogram(name)}
          </span>
        )}
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
