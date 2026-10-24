import { Link, useNavigate } from "react-router-dom";
import siteData from "../../data/site.json";
import { clearAuth, isAuthenticated } from "../../lib/auth";

export default function SiteHeader({ variant = "default" }) {
  const navigate = useNavigate();
  const isCms = variant === "cms";
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    clearAuth();
    navigate("/cms/login", { replace: true });
  };

  return (
    <header className="absolute top-4 left-4 right-4 z-50 flex items-start justify-between gap-3 sm:top-6 sm:left-6 sm:right-6 md:top-8 md:left-8 md:right-8 md:gap-4">
      <Link
        to="/"
        className="font-mono text-xl font-bold tracking-tighter italic transition-colors hover:text-neon-cyan sm:text-2xl"
      >
        {siteData.logo}
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant sm:gap-6 sm:text-sm">
        {!isCms && (
          <>
            <Link to="/" className="hover:text-neon-cyan">
              Home
            </Link>
            <Link to="/blog" className="hover:text-neon-cyan">
              Blog
            </Link>
            {loggedIn && (
              <Link to="/cms/blogs" className="hover:text-neon-cyan">
                CMS
              </Link>
            )}
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
        {(isCms || loggedIn) && (
          <button
            type="button"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
