import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { compressImageFile } from "../../lib/compressImage";

function normalizeImageUrl(raw) {
  const url = String(raw || "").trim();
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function looksLikeImageUrl(url) {
  const path = new URL(url).pathname.toLowerCase();
  return /\.(avif|bmp|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

async function validateRemoteImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.referrerPolicy = "no-referrer";
    img.src = url;
  });
}

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write your post…",
}) {
  const fileInputRef = useRef(null);
  const insertFileRef = useRef(null);
  const insertUrlRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "blog-editor-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "rich-text-editor__content",
      },
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const image = [...files].find((f) => f.type.startsWith("image/"));
        if (!image) return false;
        event.preventDefault();
        insertFileRef.current?.(image);
        return true;
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (!file) continue;
            event.preventDefault();
            insertFileRef.current?.(file);
            return true;
          }
        }

        const text = event.clipboardData?.getData("text/plain")?.trim();
        const maybeUrl = normalizeImageUrl(text);
        if (maybeUrl && looksLikeImageUrl(maybeUrl)) {
          event.preventDefault();
          insertUrlRef.current?.(maybeUrl);
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange?.(current.getHTML());
    },
  });

  const insertCompressedImage = useCallback(
    async (file) => {
      if (!editor) return;
      setBusy(true);
      setMessage("Compressing image…");
      try {
        const dataUrl = await compressImageFile(file);
        editor.chain().focus().setImage({ src: dataUrl, alt: file.name }).run();
        setMessage("Image inserted (compressed).");
      } catch (err) {
        setMessage(err.message || "Failed to insert image.");
      } finally {
        setBusy(false);
        window.setTimeout(() => setMessage(""), 2500);
      }
    },
    [editor],
  );

  const insertImageFromUrl = useCallback(
    async (rawUrl) => {
      if (!editor) return;

      const url = normalizeImageUrl(rawUrl);
      if (!url) {
        setMessage("Enter a valid http(s) image URL.");
        window.setTimeout(() => setMessage(""), 2500);
        return;
      }

      setBusy(true);
      setMessage("Loading CDN image…");
      try {
        const ok = await validateRemoteImage(url);
        if (!ok && !looksLikeImageUrl(url)) {
          throw new Error(
            "Could not load that URL as an image. Check the CDN link.",
          );
        }

        const alt = (() => {
          try {
            const name = new URL(url).pathname.split("/").pop() || "image";
            return decodeURIComponent(name);
          } catch {
            return "image";
          }
        })();

        editor.chain().focus().setImage({ src: url, alt }).run();
        setMessage(
          ok
            ? "CDN image inserted."
            : "URL inserted (could not preview; verify it loads).",
        );
      } catch (err) {
        setMessage(err.message || "Failed to insert CDN image.");
      } finally {
        setBusy(false);
        window.setTimeout(() => setMessage(""), 2500);
      }
    },
    [editor],
  );

  useEffect(() => {
    insertFileRef.current = insertCompressedImage;
  }, [insertCompressedImage]);

  useEffect(() => {
    insertUrlRef.current = insertImageFromUrl;
  }, [insertImageFromUrl]);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (next !== current) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL", previous);
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

  const promptCdnImage = () => {
    const url = window.prompt(
      "Image CDN URL (https://…)",
      "https://",
    );
    if (url === null) return;
    insertImageFromUrl(url);
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__toolbar" role="toolbar">
        <ToolbarButton
          label="B"
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          label="H3"
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
        <ToolbarButton
          label="• List"
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Code"
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarButton
          label="Link"
          title="Add link"
          active={editor.isActive("link")}
          onClick={setLink}
        />
        <ToolbarButton
          label={busy ? "…" : "Image"}
          title="Upload & compress local image"
          disabled={busy}
          onClick={() => fileInputRef.current?.click()}
        />
        <ToolbarButton
          label="CDN"
          title="Insert image from CDN URL"
          disabled={busy}
          onClick={promptCdnImage}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) insertCompressedImage(file);
          }}
        />
      </div>

      <EditorContent editor={editor} />

      {(busy || message) && (
        <p className="mt-2 font-mono text-[11px] text-on-surface-variant">
          {message || "Working…"}
        </p>
      )}
      <p className="mt-1 font-mono text-[10px] text-on-surface-variant/80">
        Local images are compressed (max 1400px). Use CDN for remote URLs, or
        paste an image URL / drop a file.
      </p>
    </div>
  );
}

function ToolbarButton({ label, title, active, disabled, onClick }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rich-text-editor__btn ${active ? "is-active" : ""}`}
    >
      {label}
    </button>
  );
}
