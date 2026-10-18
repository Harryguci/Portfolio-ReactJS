import ImmersiveBackground from "../effects/ImmersiveBackground";
import SiteHeader from "./SiteHeader";

export default function AppShell({ children, headerVariant = "default" }) {
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
