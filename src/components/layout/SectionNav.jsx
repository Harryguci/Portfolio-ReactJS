function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function SectionNav({ activeSection }) {
  const links = [
    { id: "about", label: "PROFIL" },
    { id: "projects", label: "PROJECT" },
    { id: "contact", label: "CONTACT PERSON" },
  ];

  return (
    <nav
      className="mb-16 flex justify-center gap-8 border-t border-white/10 py-8 font-mono text-sm tracking-widest uppercase"
      aria-label="Section navigation"
    >
      {links.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
            }}
            className={
              isActive
                ? "rounded-full bg-white/20 px-4 py-1 text-ghost-white"
                : "text-on-surface-variant transition-colors hover:text-ghost-white"
            }
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
