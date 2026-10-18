import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { api } from "../../lib/api";
import { clearAuth, getToken } from "../../lib/auth";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default function CmsBlogListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    const token = getToken();
    if (!token) {
      navigate("/cms/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    api
      .cmsListBlogs(token, {
        q: query || undefined,
        status: status || undefined,
        page: 1,
        pageSize: 50,
      })
      .then(setData)
      .catch((err) => {
        if (err.status === 401) {
          clearAuth();
          navigate("/cms/login", { replace: true });
          return;
        }
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    const token = getToken();
    setBusyId(id);
    try {
      await api.cmsDeleteBlog(token, id);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/cms/login", { replace: true });
  };

  return (
    <AppShell headerVariant="cms">
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              CMS
            </p>
            <h1 className="mt-2 font-display text-3xl font-black uppercase">
              Posts
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cms/blogs/new"
              className="border border-neon-cyan/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/10"
            >
              New post
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-ghost-white"
            >
              Logout
            </button>
          </div>
        </div>

        <form
          className="mb-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title/slug…"
            className="flex-1 border-b border-white/15 bg-transparent px-2 py-2 font-mono text-sm outline-none focus:border-neon-cyan"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-white/15 bg-[#13023d] px-3 py-2 font-mono text-xs uppercase"
          >
            <option value="">All statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <button
            type="submit"
            className="border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-neon-cyan"
          >
            Filter
          </button>
        </form>

        {loading && (
          <p className="font-mono text-sm text-on-surface-variant">Loading…</p>
        )}
        {error && <p className="font-mono text-sm text-red-300">{error}</p>}

        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-white/10 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((post) => (
                <tr key={post.id} className="border-b border-white/5">
                  <td className="px-4 py-4">
                    <div className="font-medium">{post.title}</div>
                    <div className="mt-1 font-mono text-xs text-on-surface-variant">
                      /{post.slug}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs uppercase">
                    <span
                      className={
                        post.status === "Published"
                          ? "text-neon-cyan"
                          : "text-on-surface-variant"
                      }
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant">
                    {formatDate(post.updatedAt)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-3 font-mono text-xs uppercase tracking-widest">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-on-surface-variant hover:text-neon-cyan"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </Link>
                      <Link
                        to={`/cms/blogs/${post.id}/edit`}
                        className="hover:text-neon-cyan"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={busyId === post.id}
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-300 hover:text-red-200 disabled:opacity-40"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && data?.items?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center font-mono text-sm text-on-surface-variant"
                  >
                    No posts yet. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </AppShell>
  );
}
