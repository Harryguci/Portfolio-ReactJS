import { Link } from "react-router-dom";
import siteData from "../../data/site.json";

export default function SiteHeader({ variant = "default" }) {
  const isCms = variant === "cms";

  return (
    <header className="absolute top-8 left-8 right-8 z-50 flex items-start justify-between gap-4">
      <Link
        to="/"
        className="font-mono text-2xl font-bold tracking-tighter italic transition-colors hover:text-neon-cyan"
      >
        {siteData.logo}
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-4 font-mono text-xs uppercase tracking-widest text-on-surface-variant sm:gap-6 sm:text-sm">
        {!isCms && (
          <>
            <Link to="/" className="hover:text-neon-cyan">
              Home
            </Link>
            <Link to="/blog" className="hover:text-neon-cyan">
              Blog
            </Link>
          </>
        )}
        {isCms && (
          <>
            <Link to="/blog" className="hover:text-neon-cyan">
              View blog
            </Link>
            <Link to="/cms/blogs" className="hover:text-neon-cyan">
              CMS
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
