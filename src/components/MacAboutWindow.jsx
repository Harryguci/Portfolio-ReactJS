import MacWindowFrame from "./MacWindowFrame";
import ProjectDetailContent from "./ProjectDetailContent";
import "../Assets/Styles/SCSS/MacAboutWindow.scss";

export default function MacAboutWindow({
  id = "about",
  content,
  imgUrl,
  buttons = [],
}) {
  return (
    <section id={id} className="mac-about">
      <MacWindowFrame title="About Me" mode="embedded" className="mac-about__window">
        <div className="mac-about__layout">
          <div className="mac-about__photo">
            <img src={imgUrl} alt="Profile" />
          </div>
          <div className="mac-about__content">
            <ProjectDetailContent
              title="ABOUT ME"
              h2=""
              content={content}
              buttons={buttons}
            />
          </div>
        </div>
      </MacWindowFrame>
    </section>
  );
}
