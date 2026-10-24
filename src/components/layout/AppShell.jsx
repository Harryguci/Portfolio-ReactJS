import ImmersiveBackground from "../effects/ImmersiveBackground";
import useReducedEffects from "../../hooks/useReducedEffects";
import SiteHeader from "./SiteHeader";

export default function AppShell({ children, headerVariant = "default" }) {
  useReducedEffects();

  return (
    <div className="relative min-h-screen bg-dark-blue text-ghost-white">
      <ImmersiveBackground />
      <div className="relative z-10">
        <SiteHeader variant={headerVariant} />
        {children}
      </div>
    </div>
  );
}
