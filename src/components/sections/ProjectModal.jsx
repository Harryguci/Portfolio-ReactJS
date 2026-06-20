import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const requestClose = useCallback(() => {
    if (isExiting) return;
    if (prefersReducedMotion) {
      onClose();
      return;
    }
    setIsExiting(true);
  }, [isExiting, onClose, prefersReducedMotion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [requestClose]);

  const handlePanelAnimationEnd = (e) => {
    if (isExiting && e.animationName === "modalPanelOut") {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div
      className={`project-modal fixed inset-0 z-[100] flex items-center justify-center p-4 ${isExiting ? "project-modal--exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        className="project-modal__backdrop absolute inset-0 bg-deep-void/85"
        aria-label="Close modal"
        onClick={requestClose}
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        onAnimationEnd={handlePanelAnimationEnd}
        className="project-modal__panel glass-panel relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg"
      >
        <div
          className="project-modal__glow pointer-events-none absolute -inset-px rounded-lg opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,242,255,0.25), transparent 40%, rgba(76,110,245,0.15))",
          }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={requestClose}
          className="absolute right-4 top-4 z-10 font-mono text-sm text-on-surface-variant transition-colors hover:text-neon-cyan"
          aria-label="Close"
        >
          [ESC]
        </button>

        <div className="project-modal__scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-6 md:p-10">
          {project.imgUrl && (
            <div className="project-modal__reveal project-modal__reveal--1 relative mb-6 overflow-hidden rounded-lg">
              <img
                src={project.imgUrl}
                alt={project.h2}
                className="max-h-64 w-full max-w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-blue/60 to-transparent"
                aria-hidden="true"
              />
            </div>
          )}

          <h2
            id="project-modal-title"
            className="project-modal__reveal project-modal__reveal--2 text-glow mb-4 break-words font-display text-3xl font-black uppercase tracking-tight md:text-4xl"
          >
            {project.h2}
          </h2>

          <div className="project-modal__reveal project-modal__reveal--3 project-modal__markdown mb-8 max-w-full font-body text-sm leading-relaxed text-on-surface-variant md:text-base">
            <Markdown>{project.content}</Markdown>
          </div>

          {project.buttons?.length > 0 && (
            <div className="project-modal__reveal project-modal__reveal--4 flex flex-wrap gap-4">
            {project.buttons.map((btn) => {
              const disabled = btn.disabled;
              const className =
                "rounded px-6 py-2 font-mono text-sm font-bold uppercase tracking-widest transition-all " +
                (disabled
                  ? "cursor-not-allowed border border-white/10 text-on-surface-variant opacity-50"
                  : "bg-neon-cyan text-dark-blue hover:scale-105 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]");

              if (btn.type === "link" && !disabled && btn.href) {
                return (
                  <a
                    key={btn.name}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {btn.name}
                  </a>
                );
              }

              return (
                <button
                  key={btn.name}
                  type="button"
                  disabled={disabled}
                  className={className}
                  onClick={() => {
                    if (!disabled && btn.href && btn.href !== "#") {
                      window.open(btn.href, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  {btn.name}
                </button>
              );
            })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
