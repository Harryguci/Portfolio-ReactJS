import "../Assets/Styles/SCSS/DesktopIcon.scss";

export default function DesktopIcon({
  label,
  imgUrl,
  position,
  onOpen,
  index = 0,
  isVisible = true,
  style,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className={`desktop-icon ${isVisible ? "desktop-icon--visible" : ""}`}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transitionDelay: `${index * 0.1}s`,
        ...style,
      }}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open project ${label}`}
    >
      <div
        className="desktop-icon__thumb"
        style={{ animationDelay: `${index * 0.15 + 0.5}s` }}
      >
        <img src={imgUrl} alt="" />
        <span className="desktop-icon__shine" aria-hidden="true" />
      </div>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
