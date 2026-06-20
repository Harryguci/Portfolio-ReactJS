import MacWindowFrame from "./MacWindowFrame";
import "../Assets/Styles/SCSS/MacExperienceDesk.scss";

const skills = [
  { name: "HTML", url: "https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png" },
  { name: "CSS3", url: "./scss.png" },
  { name: ".NET", url: "https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2019/11/msft.net_large_purple-1.png" },
  { name: "Javascript", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" },
  { name: "Typescript", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" },
  { name: "React", url: "./logo512.png" },
  { name: "Git", url: "https://www.flexmind.co/wp-content/uploads/2020/04/logo-git-icon-e1586889963495.png" },
  { name: "MongoDB", url: "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Picture.png" },
  { name: "SQL Server", url: "./SQL-server.jpg" },
  { name: "MySQL", url: "./MySql.jpg" },
  { name: "MariaDB", url: "https://tse3.mm.bing.net/th/id/OIP.OTVdttLMJrP9U-Vp1hEzlwAAAA?rs=1&pid=ImgDetMain" },
  { name: "Deploy", url: "./cloud-server-icon-vector-15548468.jpg" },
  { name: "Docker", url: "https://tse2.mm.bing.net/th/id/OIP.svA18pveVjdiWvAwjI-tlgHaHa?rs=1&pid=ImgDetMain" },
  { name: "Azure", url: "https://swimburger.net/media/0zcpmk1b/azure.jpg" },
  { name: "Python", url: "https://alhazen.academy/wp-content/uploads/2024/07/apa-sih-python-itu.jpg" },
  { name: "Next.js", url: "https://tse1.mm.bing.net/th/id/OIP.F4ZMUhYoJeGVHf9ur-4C7gHaHa?rs=1&pid=ImgDetMain" },
  { name: "Scrum", url: "https://as1.ftcdn.net/v2/jpg/03/35/87/38/1000_F_335873870_9lGF7CqjQinw5AdAxIDobvNTwgcZrzOq.jpg" },
  { name: "Patterns", url: "https://static.vecteezy.com/system/resources/previews/004/578/736/original/enterprise-development-configuration-management-free-vector.jpg" },
  { name: "AI Training", url: "https://cdn.analyticsvidhya.com/wp-content/uploads/2025/05/4-4.webp" },
  { name: "AI Integration", url: "https://www.xevensolutions.com/wp-content/uploads/2024/06/what-are-the-AI-models.jpg" },
];

export default function MacExperienceDesk({ id = "experience" }) {
  return (
    <section id={id} className="mac-experience-desk">
      <div className="mac-experience-desk__windows">
        <MacWindowFrame
          title="Notes — Experience"
          mode="embedded"
          className="mac-experience-desk__notes"
        >
          <div className="mac-experience-desk__job">
            <img
              src="/1727497380757.jpg"
              alt="QC Technology Solution"
              className="mac-experience-desk__avatar"
            />
            <div>
              <h3>QC Technology Solution</h3>
              <p className="mac-experience-desk__subtitle">
                Software Development Company
              </p>
              <p>
                <strong>03/2024 - Present</strong> · Full-Stack Developer
              </p>
            </div>
          </div>
        </MacWindowFrame>

        <MacWindowFrame
          title="Applications"
          mode="embedded"
          className="mac-experience-desk__finder"
        >
          <div className="mac-experience-desk__skills">
            {skills.map((skill) => (
              <div key={skill.name} className="mac-experience-desk__skill">
                <div className="mac-experience-desk__skill-icon">
                  <img src={skill.url} alt="" />
                </div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </MacWindowFrame>
      </div>
    </section>
  );
}
