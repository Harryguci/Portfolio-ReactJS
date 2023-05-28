import { useState, useRef } from "react";
import logo from "../logo.svg";
import "../Assets/Styles/SCSS/navbar.scss";
import { FaBars } from "react-icons/fa";

const nav_items = [
  { content: "Home", href: "/" },
  { content: "About", href: "/About" },
  { content: "Education", href: "/" },
  { content: "Experience", href: "/" },
];

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(null);
  const menubarRef = useRef(null);

  const handleToggleMenu = () => {
    if (toggleMenu === null) setToggleMenu(false);
    else setToggleMenu(!toggleMenu);
    console.log(toggleMenu);
  };
  return (
    <nav className="container-fluid mt-3 mt-md-5">
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
              <a href="/" className="nav-link">
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
        <div className="toggle-menu d-flex justify-content-end">
          <button
            type="button"
            className="btn rounded-0 mt-2"
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
