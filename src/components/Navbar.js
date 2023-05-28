import { useState, useRef } from "react";
import logo from "../harryguci-logo-white.png";
import "../Assets/Styles/SCSS/navbar.scss";
import { FaBars } from "react-icons/fa";

const nav_items = [
  { content: "Home", href: "#header" },
  { content: "About", href: "#about" },
  { content: "Services", href: "#services" },
  { content: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menubarRef = useRef(null);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <nav className="container-fluid mt-4 mt-md-5">
      <div className="container-md d-flex">
        <div className="navbar-brand">
          <img src={logo} alt="logo" />
        </div>
        <ul
          ref={menubarRef}
          className={
            "nav navbar w-100 justify-content-end d-flex " +
            (toggleMenu === false ? "" : "active")
          }
        >
          {nav_items.map((item) => (
            <li key={item.content} className="navbar-item">
              <a href={item.href} className="nav-link">
                {item.content}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact-form" className="nav-link btn-custom">
              Contact
            </a>
          </li>
        </ul>
        <div className="toggle-menu d-flex justify-content-end align-items-center">
          <button
            type="button"
            className="btn d-block rounded-0"
            style={{
              height: "max-content",
              fontSize: 1 +"rem",
              color: "white",
            }}
            onClick={handleToggleMenu}
          >
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
}
