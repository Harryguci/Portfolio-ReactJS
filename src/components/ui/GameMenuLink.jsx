export default function GameMenuLink({ href, children, active = false }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      className={`game-menu-item ${active ? "text-ghost-white" : "text-on-surface-variant"}`}
    >
      {children}
    </a>
  );
}
