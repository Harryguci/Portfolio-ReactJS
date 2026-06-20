import { forwardRef } from "react";
import "../Assets/Styles/SCSS/MacWindow.scss";

const MacWindowFrame = forwardRef(function MacWindowFrame(
  {
    title,
    children,
    mode = "embedded",
    className = "",
    style,
    isFocused = false,
    isMaximized = false,
    isMinimized = false,
    onTitleBarMouseDown,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    role,
    ariaLabel,
    tabIndex = -1,
    onAnimationEnd,
  },
  ref
) {
  const isInteractive = mode === "interactive";
  const classNames = [
    "mac-window",
    isInteractive && isFocused ? "focused" : "",
    isInteractive && isMaximized ? "maximized" : "",
    isInteractive && isMinimized ? "minimized" : "",
    mode === "embedded" ? "mac-window--embedded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleTitleBarMouseDown = (event) => {
    if (!isInteractive) return;
    onTitleBarMouseDown?.(event);
  };

  const handleLightClick = (event, handler) => {
    event.stopPropagation();
    if (isInteractive) handler?.();
  };

  return (
    <div
      ref={ref}
      className={classNames}
      style={style}
      role={role}
      aria-label={ariaLabel ?? title}
      tabIndex={tabIndex}
      onAnimationEnd={onAnimationEnd}
      onMouseDown={() => isInteractive && onFocus?.()}
    >
      <div
        className="mac-window__titlebar"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="mac-window__traffic-lights">
          <button
            type="button"
            className="mac-window__light mac-window__light--close"
            aria-label="Close window"
            tabIndex={isInteractive ? 0 : -1}
            onClick={(event) => handleLightClick(event, onClose)}
          />
          <button
            type="button"
            className="mac-window__light mac-window__light--minimize"
            aria-label="Minimize window"
            tabIndex={isInteractive ? 0 : -1}
            onClick={(event) => handleLightClick(event, onMinimize)}
          />
          <button
            type="button"
            className="mac-window__light mac-window__light--maximize"
            aria-label="Maximize window"
            tabIndex={isInteractive ? 0 : -1}
            onClick={(event) => handleLightClick(event, onMaximize)}
          />
        </div>
        <div className="mac-window__title">{title}</div>
      </div>
      <div className="mac-window__body">{children}</div>
    </div>
  );
});

export default MacWindowFrame;
