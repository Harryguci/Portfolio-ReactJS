import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { api } from "../lib/api";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogListPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    api
      .listBlogs({ q: search || undefined, page, pageSize: 9 })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load posts");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, page]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              Writing
            </p>
            <h1 className="mt-2 font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="mt-3 max-w-xl text-on-surface-variant">
              Notes on software, AI, and building products.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              setSearch(query.trim());
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              className="w-full border-b border-white/15 bg-transparent px-2 py-2 font-mono text-sm outline-none focus:border-neon-cyan"
            />
            <button
              type="submit"
              className="shrink-0 border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-neon-cyan hover:text-neon-cyan"
            >
              Search
            </button>
          </form>
        </div>

        {loading && (
          <p className="font-mono text-sm text-on-surface-variant">Loading…</p>
        )}
        {error && (
          <p className="font-mono text-sm text-red-300">{error}</p>
        )}

        {!loading && !error && data?.items?.length === 0 && (
          <p className="font-mono text-sm text-on-surface-variant">
            No published posts yet.
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items?.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block border border-white/10 bg-white/[0.02] p-5 transition hover:border-neon-cyan/40 hover:bg-white/[0.04]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
                {formatDate(post.publishedAt)}
              </p>
              <h2 className="mt-3 font-display text-xl font-bold leading-snug group-hover:text-neon-cyan">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm text-on-surface-variant">
                  {post.excerpt}
                </p>
              )}
              {post.tags && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-neon-cyan/70">
                  {post.tags}
                </p>
              )}
            </Link>
          ))}
        </div>

        {data && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4 font-mono text-sm">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="disabled:opacity-40 hover:text-neon-cyan"
            >
              Prev
            </button>
            <span className="text-on-surface-variant">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="disabled:opacity-40 hover:text-neon-cyan"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </AppShell>
  );
}
