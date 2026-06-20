import { DEFAULT_WALLPAPER } from "../data/macosSections";
import "../Assets/Styles/SCSS/MacDesktopShell.scss";

export default function MacDesktopShell({
  children,
  wallpaper = DEFAULT_WALLPAPER,
}) {
  return (
    <div className="mac-desktop-shell">
      <div
        className="mac-desktop-shell__wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
        aria-hidden="true"
      />
      <div className="mac-desktop-shell__overlay" aria-hidden="true" />
      <div className="mac-desktop-shell__canvas">{children}</div>
    </div>
  );
}
