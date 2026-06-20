import contactData from "../../data/contact.json";
import siteData from "../../data/site.json";
import MessageForm from "../MessageForm";
import SectionBookReveal from "../ui/SectionBookReveal";

const ICON_MAP = {
  github: "GH",
  linkedin: "IN",
  instagram: "IG",
  facebook: "FB",
};

export default function ContactSection() {
  return (
    <SectionBookReveal id="contact" className="relative py-16 pb-32">
      <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:gap-24">
        <div className="relative flex flex-col items-center overflow-visible">
          <h3 className="mb-8 font-display text-2xl font-bold uppercase tracking-widest">
            CONTACT ME
          </h3>
          <div className="mb-4 flex items-center gap-4 sm:gap-5">
            <div className="flex h-64 w-64 shrink-0 items-center justify-center rounded-full border border-white/20 p-2">
              <img
                alt={siteData.fullName}
                className="h-full w-full rounded-full object-cover"
                src={siteData.portrait2}
              />
            </div>

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {contactData.socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="flex items-center rounded-full bg-white px-3 py-1.5 text-black shadow-sm transition-transform hover:scale-105"
                  >
                    <span className="whitespace-nowrap font-mono text-[10px] font-bold sm:text-xs">
                      {ICON_MAP[link.icon] ?? "→"} {link.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest">
            {siteData.fullName}
            <br />
            <span className="text-on-surface-variant">{siteData.tagline}</span>
          </p>
          <div className="mt-6 space-y-1 text-center font-mono text-xs text-on-surface-variant">
            <p>{contactData.phone}</p>
            <p>{contactData.email}</p>
            <p>{contactData.location}</p>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col items-center md:items-start">
          <h2 className="mb-2 text-center font-display text-6xl font-black uppercase leading-none tracking-tighter md:text-left md:text-8xl">
            THANK YOU
          </h2>
          <p className="mb-8 font-mono text-5xl text-on-surface-variant md:text-6xl">
            {siteData.year}
          </p>

          <div className="glass-panel w-full rounded-lg p-6 md:p-8">
            <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-widest">
              Send a message
            </h3>
            <MessageForm />
          </div>
        </div>
      </div>
    </SectionBookReveal>
  );
}
