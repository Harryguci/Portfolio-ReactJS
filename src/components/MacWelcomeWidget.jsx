import { useEffect, useState } from "react";
import contentData from "../data/content.json";
import "../Assets/Styles/SCSS/MacWelcomeWidget.scss";

const ROLE_TEXT = "Fullstack Software Developer";

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function MacWelcomeWidget({
  id = "header",
  displayName = contentData.displayName ?? "Harryguci",
  tagline = contentData.tagline ?? "Web · AI · .NET",
  imgUrl = "./IMG_2790.JPG",
}) {
  const [roleText, setRoleText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= ROLE_TEXT.length) {
        setRoleText(ROLE_TEXT.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTypingDone(true);
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handlePortfolio = (event) => {
    event.preventDefault();
    scrollToSection("#portfolio");
  };

  const handleContact = (event) => {
    event.preventDefault();
    scrollToSection("#contact-form");
  };

  return (
    <section id={id} className="mac-welcome">
      <div className="mac-welcome__content">
        <img
          src={imgUrl}
          alt={displayName}
          className="mac-welcome__avatar"
        />
        <h1 className="mac-welcome__name">{displayName}</h1>
        <p className="mac-welcome__role">
          {roleText}
          {!typingDone && <span className="mac-welcome__cursor">|</span>}
        </p>
        <p className="mac-welcome__tagline">{tagline}</p>
        <div className="mac-welcome__actions">
          <a
            href="#portfolio"
            className="mac-welcome__button mac-welcome__button--primary"
            onClick={handlePortfolio}
          >
            View Portfolio
          </a>
          <a
            href="#contact-form"
            className="mac-welcome__button mac-welcome__button--ghost"
            onClick={handleContact}
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
