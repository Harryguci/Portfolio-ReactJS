import { useEffect, useState } from "react";
import MacDesktopShell from "../components/MacDesktopShell";
import MacWelcomeWidget from "../components/MacWelcomeWidget";
import MacAboutWindow from "../components/MacAboutWindow";
import MacDesktop from "../components/MacDesktop";
import MacLaunchpad from "../components/MacLaunchpad";
import MacExperienceDesk from "../components/MacExperienceDesk";
import MacMailWindow from "../components/MacMailWindow";
import "../Assets/Styles/SCSS/_base.scss";
import "../Assets/Styles/SCSS/home.scss";
import contentData from "../data/content.json";
import projectsData from "../data/projects.json";

const aboutButtons = [
  {
    name: "Read More",
    type: "link",
    attr: ['href="/"'],
  },
  {
    name: "Download Resume",
    type: "link",
    attr: ['href="/download-resume"'],
  },
];

function Home() {
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setContent(contentData.aboutMe);
    setProjects(projectsData);
  }, []);

  return (
    <MacDesktopShell>
      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--welcome">
        <MacWelcomeWidget />
      </div>

      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--compact">
        <MacAboutWindow content={content} imgUrl="./IMG_2790.JPG" buttons={aboutButtons} />
      </div>

      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--portfolio">
        <MacDesktop projects={projects} />
      </div>

      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--compact">
        <MacLaunchpad />
      </div>

      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--compact">
        <MacExperienceDesk />
      </div>

      <div className="mac-desktop-shell__zone mac-desktop-shell__zone--compact">
        <MacMailWindow />
      </div>

      <p className="mac-desktop-shell__copyright">
        2025 - Harryguci, All rights reserved
      </p>
    </MacDesktopShell>
  );
}

export default Home;
