import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import MacWindow from "./MacWindow";
import "../Assets/Styles/SCSS/MacDesktop.scss";

const DEFAULT_POSITIONS = [
  { top: "6%", left: "4%" },
  { top: "10%", left: "20%" },
  { top: "4%", left: "40%" },
  { top: "14%", left: "58%" },
  { top: "8%", left: "76%" },
  { top: "36%", left: "10%" },
  { top: "40%", left: "66%" },
];

function deriveLabel(project) {
  if (project.desktopLabel) return project.desktopLabel;
  return project.h2.slice(0, 18).toUpperCase();
}

function getIconPosition(project, index) {
  if (project.desktopPosition) {
    return {
      top: project.desktopPosition.top,
      left: project.desktopPosition.left,
    };
  }
  return DEFAULT_POSITIONS[index % DEFAULT_POSITIONS.length];
}

let nextWindowId = 1;
let nextZIndex = 100;

export default function MacDesktop({ projects }) {
  const sectionRef = useRef(null);
  const desktopRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [focusedWindowId, setFocusedWindowId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projectItems = useMemo(
    () =>
      projects.map((project, index) => ({
        project,
        index,
        label: deriveLabel(project),
        position: getIconPosition(project, index),
      })),
    [projects]
  );

  const openOrFocusWindow = useCallback((projectIndex) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.projectIndex === projectIndex);
      if (existing) {
        setFocusedWindowId(existing.id);
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, minimized: false, isOpening: true, zIndex: ++nextZIndex }
            : w
        );
      }

      const id = nextWindowId++;
      const offset = prev.length * 28;
      setFocusedWindowId(id);

      return [
        ...prev,
        {
          id,
          projectIndex,
          minimized: false,
          maximized: false,
          isOpening: true,
          zIndex: ++nextZIndex,
          position: { x: 100 + offset, y: 80 + offset },
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized, zIndex: ++nextZIndex } : w
      )
    );
    setFocusedWindowId(id);
  }, []);

  const focusWindow = useCallback((id) => {
    setFocusedWindowId(id);
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++nextZIndex } : w))
    );
  }, []);

  const clearOpening = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpening: false } : w))
    );
  }, []);

  const moveWindow = useCallback((id, position) => {
    const desktop = desktopRef.current;
    if (!desktop) return;

    const bounds = desktop.getBoundingClientRect();
    const maxX = bounds.width - 360;
    const maxY = bounds.height - 240;

    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              position: {
                x: Math.max(8, Math.min(position.x - bounds.left, maxX)),
                y: Math.max(8, Math.min(position.y - bounds.top, maxY)),
              },
            }
          : w
      )
    );
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`mac-desktop ${isVisible ? "mac-desktop--visible" : ""}`}
    >
      <div className="mac-desktop__content">
        <header className="mac-desktop__header">
          <h2 className="mac-desktop__title">Portfolio</h2>
          <p className="mac-desktop__hint">
            Click a project icon to open details
          </p>
        </header>

        <div className="mac-desktop__icons" ref={desktopRef}>
          <div className="mac-desktop__icons-grid">
            {projectItems.map(({ project, index, label, position }) => (
              <DesktopIcon
                key={index}
                index={index}
                isVisible={isVisible}
                label={label}
                imgUrl={project.imgUrl}
                position={position}
                onOpen={() => openOrFocusWindow(index)}
              />
            ))}
          </div>

          <div className="mac-desktop__windows">
            {openWindows.map((windowState) => {
              const project = projects[windowState.projectIndex];
              return (
                <MacWindow
                  key={windowState.id}
                  id={windowState.id}
                  title={project.h2}
                  project={project}
                  position={windowState.position}
                  zIndex={windowState.zIndex}
                  isFocused={focusedWindowId === windowState.id}
                  isMaximized={windowState.maximized}
                  isMinimized={windowState.minimized}
                  isOpening={windowState.isOpening}
                  onOpenAnimationEnd={() => clearOpening(windowState.id)}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  onMaximize={maximizeWindow}
                  onFocus={focusWindow}
                  onMove={moveWindow}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
