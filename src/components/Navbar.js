import logo from "../logo.svg";
import "../Assets/Styles/SCSS/navbar.scss";

const nav_items = [
  { content: "Home", href: "/" },
  { content: "About", href: "/About" },
  { content: "Education", href: "/" },
  { content: "Experience", href: "/" },
];

export default function Navbar() {
  return (
    <nav className="container-fluid mt-3 mt-md-5">
      <div className="container-md d-flex">
        <div className="navbar-brand">
          <img src={logo} width="80" height="80" alt="logo" />
        </div>
        <ul className="nav navbar w-100 justify-content-end">
          {nav_items.map((item) => (
            <li key={item.content} className="navbar-item">
              <a href="/" className="nav-link">
                {item.content}
              </a>
            </li>
          ))}
          <li>
            <a href="/" className="nav-link btn-custom">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
