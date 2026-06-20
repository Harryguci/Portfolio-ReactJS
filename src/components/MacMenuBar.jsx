import { useEffect, useState } from "react";
import { FaWifi, FaBatteryFull } from "react-icons/fa";
import useActiveSection from "../hooks/useActiveSection";
import { MACOS_SECTIONS } from "../data/macosSections";
import "../Assets/Styles/SCSS/MacMenuBar.scss";

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function MacMenuBar() {
  const activeSection = useActiveSection("header");
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 30000);
    return () => clearInterval(timer);
  }, []);

  const activeLabel =
    MACOS_SECTIONS.find((section) => section.id === activeSection)?.label ??
    "Home";

  return (
    <header className="mac-menu-bar" aria-label="Menu bar">
      <div className="mac-menu-bar__left">
        <span className="mac-menu-bar__apple" aria-hidden="true">
          &#63743;
        </span>
        <span className="mac-menu-bar__brand">Harryguci</span>
        <span className="mac-menu-bar__menu">File</span>
        <span className="mac-menu-bar__menu">Edit</span>
        <span className="mac-menu-bar__menu">View</span>
      </div>
      <div className="mac-menu-bar__center">{activeLabel}</div>
      <div className="mac-menu-bar__right">
        <FaWifi aria-hidden="true" />
        <FaBatteryFull aria-hidden="true" />
        <span className="mac-menu-bar__time">{time}</span>
      </div>
    </header>
  );
}
