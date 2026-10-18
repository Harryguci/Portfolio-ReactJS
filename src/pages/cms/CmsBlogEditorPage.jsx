import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import RichTextEditor from "../../components/blog/RichTextEditor";
import { api } from "../../lib/api";
import { clearAuth, getToken } from "../../lib/auth";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  tags: "",
  status: "Draft",
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

function isEmptyHtml(html) {
  if (!html) return true;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0 && !/<img\b/i.test(html);
}

export default function CmsBlogEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    const token = getToken();
    if (!token) {
      navigate("/cms/login", { replace: true });
      return;
    }

    api
      .cmsGetBlog(token, id)
      .then((post) => {
        setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          coverImageUrl: post.coverImageUrl || "",
          tags: post.tags || "",
          status: post.status || "Draft",
        });
        setSlugTouched(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          clearAuth();
          navigate("/cms/login", { replace: true });
          return;
        }
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, isNew, navigate]);

  const previewSlug = useMemo(() => {
    if (slugTouched && form.slug) return form.slug;
    return slugify(form.title);
  }, [form.slug, form.title, slugTouched]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      navigate("/cms/login", { replace: true });
      return;
    }

    if (isEmptyHtml(form.content)) {
      setError("Content is required.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      slug: (slugTouched ? form.slug : previewSlug).trim() || null,
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      coverImageUrl: form.coverImageUrl.trim() || null,
      tags: form.tags.trim() || null,
      status: form.status,
    };

    try {
      if (isNew) {
        await api.cmsCreateBlog(token, payload);
      } else {
        await api.cmsUpdateBlog(token, id, payload);
      }
      navigate("/cms/blogs", { replace: true });
    } catch (err) {
      if (err.status === 401) {
        clearAuth();
        navigate("/cms/login", { replace: true });
        return;
      }
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell headerVariant="cms">
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-8">
        <Link
          to="/cms/blogs"
          className="font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-neon-cyan"
        >
          ← Back to posts
        </Link>

        <h1 className="mt-6 font-display text-3xl font-black uppercase">
          {isNew ? "New post" : "Edit post"}
        </h1>

        {loading && (
          <p className="mt-8 font-mono text-sm text-on-surface-variant">
            Loading…
          </p>
        )}

        {!loading && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => {
                  updateField("title", e.target.value);
                  if (!slugTouched) {
                    updateField("slug", slugify(e.target.value));
                  }
                }}
                className="field-input"
              />
            </Field>

            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  updateField("slug", e.target.value);
                }}
                placeholder={previewSlug}
                className="field-input"
              />
              <p className="mt-2 font-mono text-[11px] text-on-surface-variant">
                Public URL: /blog/{previewSlug || "…"}
              </p>
            </Field>

            <Field label="Excerpt">
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                className="field-input"
              />
            </Field>

            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                Content
              </span>
              <RichTextEditor
                value={form.content}
                onChange={(html) => updateField("content", html)}
              />
            </div>

            <Field label="Cover image URL">
              <input
                value={form.coverImageUrl}
                onChange={(e) => updateField("coverImageUrl", e.target.value)}
                className="field-input"
              />
            </Field>

            <Field label="Tags (comma-separated)">
              <input
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                className="field-input"
              />
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
                className="field-input"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </Field>

            {error && (
              <p className="font-mono text-sm text-red-300">{error}</p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/20 disabled:opacity-50"
              >
                {saving ? "Saving…" : isNew ? "Create" : "Save changes"}
              </button>
              <Link
                to="/cms/blogs"
                className="border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-ghost-white"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </main>
    </AppShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  );
}
