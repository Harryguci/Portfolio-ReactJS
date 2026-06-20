import { useState } from "react";
import "../Assets/Styles/SCSS/MacLaunchpad.scss";

const services = [
  {
    name: "Software Dev",
    fullName: "Software Development",
    description:
      "Extensive experience in software architecture. Can build software on any platform: Desktop, Web, Mobile, etc.",
    url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b0ef1f96575065.5eb190924cc53.jpg",
  },
  {
    name: "Web Dev",
    fullName: "Website Development",
    description:
      "Proficient in HTML/CSS (SCSS), TypeScript/Javascript (ES6), .NET and React. Beautiful, responsive websites and landing pages.",
    url: "./logo512.png",
  },
  {
    name: "Game Dev",
    fullName: "Game Development",
    description:
      "Proficient in Java 17 and game structure. Libraries: SDL, Swing, AWT for games and desktop apps.",
    url: "./Java_programming_language_logo.svg.png",
  },
  {
    name: "Design",
    fullName: "Graphics Design",
    description:
      "Proficient in Adobe Photoshop, Illustrator and Lightroom. Experience in the education field.",
    url: "./adobeLogo.jpg",
  },
];

export default function MacLaunchpad({ id = "services" }) {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id={id} className="mac-launchpad">
      <div className="mac-launchpad__panel">
        <h2 className="mac-launchpad__heading">Services</h2>
        <div className="mac-launchpad__grid">
          {services.map((service) => (
            <button
              key={service.name}
              type="button"
              className={`mac-launchpad__app ${
                activeService === service.name ? "active" : ""
              }`}
              aria-label={service.fullName}
              onClick={() =>
                setActiveService((prev) =>
                  prev === service.name ? null : service.name
                )
              }
            >
              <span className="mac-launchpad__icon">
                <img src={service.url} alt="" />
              </span>
              <span className="mac-launchpad__label">{service.name}</span>
            </button>
          ))}
        </div>
        {activeService && (
          <div className="mac-launchpad__detail" role="status">
            <strong>
              {services.find((service) => service.name === activeService)?.fullName}
            </strong>
            <p>
              {services.find((service) => service.name === activeService)?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
