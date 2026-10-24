import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const inputClass =
  "w-full border-b border-white/15 bg-transparent px-1 py-2 font-mono text-sm outline-none focus:border-neon-cyan";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError("");

    api
      .listComments(slug)
      .then((result) => {
        if (!cancelled) setComments(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load comments");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      const created = await api.createComment(slug, {
        authorName: authorName.trim(),
        body: body.trim(),
      });
      setComments((prev) => [created, ...prev]);
      setAuthorName("");
      setBody("");
    } catch (err) {
      setFormError(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
        Discussion
      </p>
      <h2 className="mt-2 font-display text-2xl font-black tracking-tight">
        Comments
        {!loading && !error && (
          <span className="ml-2 font-mono text-sm font-normal text-on-surface-variant">
            ({comments.length})
          </span>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="comment-name"
            className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
          >
            Name
          </label>
          <input
            id="comment-name"
            type="text"
            required
            maxLength={100}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="comment-body"
            className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
          >
            Comment
          </label>
          <textarea
            id="comment-body"
            required
            maxLength={2000}
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts…"
            className={`${inputClass} resize-y`}
          />
        </div>
        {formError && (
          <p className="font-mono text-sm text-red-300">{formError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Post comment"}
        </button>
      </form>

      <div className="mt-10 space-y-6">
        {loading && (
          <p className="font-mono text-sm text-on-surface-variant">
            Loading comments…
          </p>
        )}
        {error && <p className="font-mono text-sm text-red-300">{error}</p>}
        {!loading && !error && comments.length === 0 && (
          <p className="font-mono text-sm text-on-surface-variant">
            No comments yet. Be the first to write one.
          </p>
        )}
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="border-b border-white/5 pb-6 last:border-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-mono text-sm text-ghost-white">
                {comment.authorName}
              </p>
              <time className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
                {formatDate(comment.createdAt)}
              </time>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
              {comment.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
