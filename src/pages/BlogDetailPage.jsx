import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import RichTextContent from "../components/blog/RichTextContent";
import CommentSection from "../components/blog/CommentSection";
import { api } from "../lib/api";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    api
      .getBlog(slug)
      .then((result) => {
        if (!cancelled) setPost(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.status === 404 ? "Post not found." : err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-8">
        <Link
          to="/blog"
          className="font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-neon-cyan"
        >
          ← Back to blog
        </Link>

        {loading && (
          <p className="mt-10 font-mono text-sm text-on-surface-variant">
            Loading…
          </p>
        )}
        {error && (
          <p className="mt-10 font-mono text-sm text-red-300">{error}</p>
        )}

        {post && (
          <article className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              {formatDate(post.publishedAt)}
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-on-surface-variant">{post.excerpt}</p>
            )}
            {post.coverImageUrl && (
              <img
                src={post.coverImageUrl}
                alt=""
                className="mt-8 w-full border border-white/10 object-cover"
              />
            )}
            <div className="mt-10">
              <RichTextContent content={post.content} />
            </div>
            {post.tags && (
              <p className="mt-12 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                {post.tags}
              </p>
            )}
            <CommentSection slug={post.slug} />
          </article>
        )}
      </main>
    </AppShell>
  );
}
