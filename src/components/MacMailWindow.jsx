import {
  FaPhone,
  FaEnvelope,
  FaLocationArrow,
  FaFacebookF,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import MacWindowFrame from "./MacWindowFrame";
import MessageForm from "./MessageForm";
import "../Assets/Styles/SCSS/MacMailWindow.scss";

const contactItems = [
  { description: "+84967259370", icon: FaPhone },
  { description: "huyquang0028@gmail.com", icon: FaEnvelope },
  { description: "Nghia Do, Hanoi, Vietnam", icon: FaLocationArrow },
  {
    description: "fb.com/chu.huy.336333/",
    icon: FaFacebookF,
    href: "https://www.facebook.com/chu.huy.336333/",
  },
  {
    description: "instagram.com/q_huy.28",
    icon: FaInstagram,
    href: "https://instagram.com/q_huy.28",
  },
  {
    description: "github.com/Harryguci",
    icon: FaGithub,
    href: "https://github.com/Harryguci",
  },
];

export default function MacMailWindow({ id = "contact-form" }) {
  return (
    <section id={id} className="mac-mail">
      <MacWindowFrame title="New Message" mode="embedded" className="mac-mail__window">
        <div className="mac-mail__layout">
          <aside className="mac-mail__sidebar">
            <h3>Leave me a Message</h3>
            <p>
              I&apos;m ready for a job as a software developer. If you want to
              contact me for work, please email me.
            </p>
            <p className="mac-mail__signoff">Have a nice day!</p>
            <ul className="mac-mail__contacts">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.description}>
                    <Icon aria-hidden="true" />
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.description}
                      </a>
                    ) : (
                      <span>{item.description}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="mac-mail__compose">
            <MessageForm variant="macos" />
          </div>
        </div>
      </MacWindowFrame>
    </section>
  );
}
