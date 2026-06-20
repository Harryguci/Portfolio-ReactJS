import { useState } from "react";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSf4r_LeYZS4ZT0A__sXOBC-A2HMrVGJhgK3_InjN6eDSTW8tA/formResponse";

const inputClass =
  "w-full border-b border-white/10 bg-[#050610] px-3 py-3 font-mono text-sm text-ghost-white placeholder:text-on-surface-variant focus:border-neon-cyan focus:outline-none focus:shadow-[0_4px_12px_rgba(0,242,255,0.15)] transition-all";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    form.submit();
    alert(`Gửi thành công! Cảm ơn ${name}`);
  };

  return (
    <form
      method="POST"
      action={FORM_ACTION}
      target="_blank"
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="entry.485905818"
          type="text"
          required
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="entry.1869112674"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-on-surface-variant"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="entry.897887378"
          rows={4}
          required
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="rounded bg-neon-cyan px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-dark-blue transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]"
      >
        Send
      </button>
    </form>
  );
}
