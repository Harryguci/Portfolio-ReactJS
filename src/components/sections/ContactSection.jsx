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
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16 lg:flex-row lg:gap-20 xl:gap-24">
        <div className="relative flex w-full max-w-lg flex-col items-center overflow-visible lg:max-w-none lg:w-auto">
          <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-widest sm:mb-8 sm:text-2xl">
            CONTACT ME
          </h3>
          <div className="mb-4 flex w-full max-w-full items-center justify-center gap-3 sm:gap-5">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full border border-white/20 p-2 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
              <img
                alt={siteData.fullName}
                className="h-full w-full rounded-full object-cover"
                src={siteData.portrait2}
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
              />
            </div>

            <ul className="flex min-w-0 flex-col gap-2 sm:gap-3">
              {contactData.socialLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${link.label}: ${link.handle}`}
                    className="flex max-w-full items-center rounded-full bg-white px-2.5 py-1.5 text-black shadow-sm transition-transform hover:scale-105 sm:px-3"
                  >
                    <span className="truncate font-mono text-[10px] font-bold sm:text-xs">
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
          <div className="mt-6 space-y-1 break-all text-center font-mono text-xs text-on-surface-variant sm:break-normal">
            <p>{contactData.phone}</p>
            <p>{contactData.email}</p>
            <p>{contactData.location}</p>
          </div>
        </div>

        <div className="flex w-full min-w-0 max-w-md flex-col items-center lg:items-start">
          <h2 className="mb-2 text-center font-display text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl lg:text-left lg:text-7xl xl:text-8xl">
            THANK YOU
          </h2>
          <p className="mb-6 font-mono text-4xl text-on-surface-variant sm:mb-8 sm:text-5xl lg:text-6xl">
            {siteData.year}
          </p>

          <div className="glass-panel w-full rounded-lg p-5 sm:p-6 md:p-8">
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
