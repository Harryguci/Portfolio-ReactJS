import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { api } from "../../lib/api";
import { isAuthenticated, setAuth } from "../../lib/auth";

export default function CmsLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/cms/blogs" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api.login(username, password);
      setAuth(result.token, result.expiresAt);
      const redirectTo = location.state?.from?.pathname || "/cms/blogs";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.status === 401 ? "Invalid credentials." : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell headerVariant="cms">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 pt-16">
        <form
          onSubmit={handleSubmit}
          className="w-full border border-white/10 bg-white/[0.03] p-8"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
            CMS
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Manage blog posts for the portfolio.
          </p>

          <label className="mt-8 block font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 w-full border-b border-white/15 bg-transparent px-1 py-2 text-sm outline-none focus:border-neon-cyan"
            />
          </label>

          <label className="mt-6 block font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full border-b border-white/15 bg-transparent px-1 py-2 text-sm outline-none focus:border-neon-cyan"
            />
          </label>

          {error && (
            <p className="mt-4 font-mono text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full border border-neon-cyan/50 bg-neon-cyan/10 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </AppShell>
  );
}
