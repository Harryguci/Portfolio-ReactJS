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
      className="mb-12 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/10 py-6 font-mono text-[11px] tracking-widest uppercase sm:mb-16 sm:gap-x-8 sm:py-8 sm:text-sm"
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
