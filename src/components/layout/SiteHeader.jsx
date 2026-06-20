import siteData from "../../data/site.json";

export default function SiteHeader() {
  return (
    <header className="absolute top-8 left-8 z-50">
      <div className="font-mono text-2xl font-bold tracking-tighter italic">
        {siteData.logo}
      </div>
    </header>
  );
}
