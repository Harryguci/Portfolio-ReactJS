import { useCallback, useEffect, useRef, useState } from "react";
import { DOCK_ICON_MAP } from "./DockIcons";
import { MACOS_SECTIONS } from "../data/macosSections";
import useActiveSection from "../hooks/useActiveSection";
import "../Assets/Styles/SCSS/MacDock.scss";

const DOCK_ITEMS = MACOS_SECTIONS.map(({ id, label }) => ({
  id,
  label,
  href: `#${id}`,
}));

const BASE_ICON_SIZE = 52;
const MAX_SCALE = 1.45;
const MAGNIFY_RANGE = 110;

function getMagnifiedScale(mouseX, iconCenterX) {
  if (mouseX === null) return 1;

  const distance = Math.abs(mouseX - iconCenterX);
  if (distance >= MAGNIFY_RANGE) return 1;

  const ratio = 1 - distance / MAGNIFY_RANGE;
  return 1 + (MAX_SCALE - 1) * ratio * ratio;
}

export default function MacDock() {
  const activeSection = useActiveSection("header");
  const [iconScales, setIconScales] = useState(() =>
    DOCK_ITEMS.map(() => 1)
  );
  const itemRefs = useRef([]);
  const centersRef = useRef([]);
  const mouseXRef = useRef(null);
  const rafRef = useRef(null);

  const updateCenters = useCallback(() => {
    centersRef.current = itemRefs.current.map((element) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
  }, []);

  const applyMagnification = useCallback(() => {
    const mouseX = mouseXRef.current;
    const centers = centersRef.current;

    if (mouseX === null) {
      setIconScales(DOCK_ITEMS.map(() => 1));
      return;
    }

    setIconScales(
      centers.map((center) => getMagnifiedScale(mouseX, center))
    );
  }, []);

  const scheduleMagnification = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      applyMagnification();
      rafRef.current = null;
    });
  }, [applyMagnification]);

  useEffect(() => {
    updateCenters();
    applyMagnification();

    const handleResize = () => {
      updateCenters();
      scheduleMagnification();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateCenters, applyMagnification, scheduleMagnification]);

  const handleMouseMove = (event) => {
    mouseXRef.current = event.clientX;
    scheduleMagnification();
  };

  const handleMouseLeave = () => {
    mouseXRef.current = null;
    scheduleMagnification();
  };

  const handleNavigate = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="mac-dock"
      aria-label="Main navigation"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mac-dock__surface">
        {DOCK_ITEMS.map((item, index) => {
          const Icon = DOCK_ICON_MAP[item.id];
          const isActive = activeSection === item.id;
          const scale = iconScales[index] ?? 1;
          const lift = (scale - 1) * -18;

          return (
            <a
              key={item.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              href={item.href}
              className={`mac-dock__item ${isActive ? "active" : ""}`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              data-tooltip={item.label}
              onClick={(event) => handleNavigate(event, item.href)}
            >
              <span
                className="mac-dock__icon"
                style={{
                  transform: `translateY(${lift}px) scale(${scale})`,
                }}
              >
                {Icon && <Icon />}
              </span>
              {isActive && <span className="mac-dock__dot" aria-hidden="true" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
