import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import SectionNav from "../components/layout/SectionNav";
import useActiveSection from "../hooks/useActiveSection";

export default function Home() {
  const { activeSection } = useActiveSection();

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-8">
      <HeroSection />
      <SectionNav activeSection={activeSection} />
      <AboutSection />
      <SectionNav activeSection={activeSection} />
      <ProjectsSection />
      <SectionNav activeSection={activeSection} />
      <ContactSection />
    </main>
  );
}
