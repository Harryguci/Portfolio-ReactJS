import ImmersiveBackground from "./components/effects/ImmersiveBackground";
import SectionRevealCanvas from "./components/effects/SectionRevealCanvas";
import SiteHeader from "./components/layout/SiteHeader";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-blue text-ghost-white">
      <ImmersiveBackground />
      <SectionRevealCanvas />
      <div className="relative z-10">
        <SiteHeader />
        <Home />
      </div>
    </div>
  );
}
