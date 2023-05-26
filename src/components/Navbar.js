import { useState } from "react";
import logo from "../logo.svg";
import "../Assets/Styles/SCSS/navbar.scss";

const nav_items = [
  { content: "Home", href: "/" },
  { content: "About", href: "/About" },
  { content: "Education", href: "/" },
  { content: "Experience", href: "/" },
];

export default function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(null);
  const handleToggleMenu = () => {
    if (toggleMenu === null) setToggleMenu(false);
    else
      setToggleMenu(!toggleMenu);
    console.log(toggleMenu);
  }
  return (
    <nav className="container-fluid mt-3 mt-md-5">
      <div className="container-md d-flex">
        <div className="navbar-brand">
          <img src={logo} width="80" height="80" alt="logo" />
        </div>
        <ul className={"nav navbar w-100 justify-content-end " + (toggleMenu === true || toggleMenu === null ? " d-flex" : " d-none")}>
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
        <div className="toggle-menu d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-outline-primary mt-3"
              style={{height: "max-content"}}
              onClick={handleToggleMenu}
            >
              Menu
            </button>
          </div>
      </div>
    </nav>
  );
}
