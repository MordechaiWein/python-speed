import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        navigate("/authentication");
      }
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling when the menu is closed
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling when the menu is open
  };

  return (
    <div className="navWrapper">
      <div
        className={`burger ${isMenuOpen ? "open" : ""}`}
        id="burger"
        onClick={isMenuOpen ? closeMenu : openMenu} // Toggle menu open/close
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <NavLink to="/" onClick={closeMenu}>
        <img src={logo} alt="Logo" />
      </NavLink>
      <div className={`navigation ${isMenuOpen ? "show" : ""}`}>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/"
          onClick={closeMenu} // Close menu when this link is clicked
        >
          Home
        </NavLink>
        {user && (
          <>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active_link" : "")}
              to="/butterflies"
              onClick={closeMenu} // Close menu when this link is clicked
            >
              Butterfly Collection
            </NavLink>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active_link" : "")}
              to="/plants"
              onClick={closeMenu} // Close menu when this link is clicked
            >
              Plant Collection
            </NavLink>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active_link" : "")}
              to="/addtothegarden"
              onClick={closeMenu} // Close menu when this link is clicked
            >
              Add to the Garden
            </NavLink>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active_link" : "")}
              to="/authentication"
              onClick={() => {
                handleLogout();
                closeMenu(); // Close menu when this link is clicked
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavLink>
          </>
        )}
        {!user && (
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/authentication"
            onClick={closeMenu} // Close menu when this link is clicked
          >
            <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
