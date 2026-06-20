import { useCallback, useEffect, useRef } from "react";
import ProjectDetailContent from "./ProjectDetailContent";
import MacWindowFrame from "./MacWindowFrame";
import "../Assets/Styles/SCSS/MacWindow.scss";

export default function MacWindow({
  id,
  title,
  project,
  position,
  zIndex,
  isFocused,
  isMaximized,
  isMinimized,
  isOpening = false,
  onOpenAnimationEnd,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}) {
  const windowRef = useRef(null);
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const handleTitleBarMouseDown = useCallback(
    (event) => {
      if (isMaximized) return;
      if (event.target.closest(".mac-window__light")) return;

      onFocus(id);
      const rect = windowRef.current?.getBoundingClientRect();
      if (!rect) return;

      dragState.current = {
        dragging: true,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
    },
    [id, isMaximized, onFocus]
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragState.current.dragging || isMaximized) return;
      onMove(id, {
        x: event.clientX - dragState.current.offsetX,
        y: event.clientY - dragState.current.offsetY,
      });
    };

    const handleMouseUp = () => {
      dragState.current.dragging = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [id, isMaximized, onMove]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isFocused) return;
      if (event.key === "Escape") {
        onClose(id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [id, isFocused, onClose]);

  const handleAnimationEnd = (event) => {
    if (event.animationName === "macWindowOpen" && isOpening) {
      onOpenAnimationEnd?.();
    }
  };

  const style = isMaximized
    ? { zIndex }
    : {
        top: position.y,
        left: position.x,
        zIndex,
      };

  return (
    <MacWindowFrame
      ref={windowRef}
      mode="interactive"
      title={title}
      className={isOpening ? "mac-window--opening" : ""}
      style={style}
      isFocused={isFocused}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
      onTitleBarMouseDown={handleTitleBarMouseDown}
      onClose={() => onClose(id)}
      onMinimize={() => onMinimize(id)}
      onMaximize={() => onMaximize(id)}
      onFocus={() => onFocus(id)}
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      ariaLabel={title}
    >
      <img
        src={project.imgUrl}
        alt={project.h2}
        className="mac-window__preview"
      />
      <ProjectDetailContent
        h2={project.h2}
        content={project.content}
        buttons={project.buttons ?? []}
        compact
        showTitle={false}
      />
    </MacWindowFrame>
  );
}
