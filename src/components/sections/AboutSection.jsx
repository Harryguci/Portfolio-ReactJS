import aboutData from "../../data/about.json";
import siteData from "../../data/site.json";
import SkillIcon from "../ui/SkillIcon";
import SectionBookReveal from "../ui/SectionBookReveal";

export default function AboutSection() {
  return (
    <SectionBookReveal id="about" className="mb-32 py-16">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div className="relative w-full md:w-5/12">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark-blue to-transparent" />
          <div className="absolute left-0 top-0 z-20 p-8">
            <p className="font-mono text-sm text-on-surface-variant">
              HELLO, I AM
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              {siteData.fullName}
            </h2>
          </div>
          <img
            alt={siteData.fullName}
            className="aspect-[3/4] w-full rounded-lg object-cover"
            src={siteData.portrait}
          />
          <div className="absolute -inset-4 -z-10 rounded-full bg-neon-cyan/5 blur-3xl" />
        </div>

        <div className="w-full md:w-7/12">
          <h2 className="mb-6 font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
            ABOUT ME
          </h2>
          <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-wide text-on-surface-variant md:text-sm">
            {aboutData.bio}
          </p>

          <h3 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight">
            SOFTWARE SKILLS
          </h3>
          <div className="mb-12 flex flex-wrap gap-2 overflow-visible sm:gap-3">
            {aboutData.skills.map((skill) => (
              <SkillIcon key={skill.name} {...skill} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-tight">
                EDUCATION
              </h3>
              {aboutData.education.map((item) => (
                <div key={item.title} className="mb-4">
                  <p className="mb-1 font-mono text-xs text-on-surface-variant">
                    • {item.period}
                  </p>
                  <p className="font-mono text-sm font-bold uppercase">
                    {item.title}
                  </p>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-tight">
                EXPERIENCE
              </h3>
              {aboutData.experience.map((item) => (
                <div key={item.title} className="flex flex-col gap-4">
                  {item.logoUrl && (
                    <img
                      src={item.logoUrl}
                      alt={`${item.title} logo`}
                      className="glass-panel h-20 w-20 rounded-full border border-white/10 bg-black/40 object-contain p-2 shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                    />
                  )}
                  <div>
                    <p className="font-mono text-sm font-bold uppercase">
                      {item.title}
                    </p>
                    <p className="mb-1 font-mono text-xs text-on-surface-variant">
                      {item.period} — {item.role}
                    </p>
                    <p className="font-mono text-xs text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-tight">
              LANGUAGE (COMMUNICATION)
            </h3>
            <div className="grid max-w-xs grid-cols-2 gap-4 font-mono text-xs uppercase text-on-surface-variant">
              {aboutData.languages.flatMap((lang) => [
                <div key={`${lang.name}-name`}>{lang.name}</div>,
                <div key={`${lang.name}-level`}>{lang.level}</div>,
              ])}
            </div>
          </div>
        </div>
      </div>
    </SectionBookReveal>
  );
}
