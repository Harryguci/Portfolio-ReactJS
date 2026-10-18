import { Link } from "react-router-dom";

export default function GameMenuLink({ href, to, children, active = false }) {
  const className = `game-menu-item ${active ? "text-ghost-white" : "text-on-surface-variant"}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

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
      className={className}
    >
      {children}
    </a>
  );
}
