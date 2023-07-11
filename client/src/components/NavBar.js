import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clicked");
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    });
  };

  if (!user)
    return (
      <div className="navWrapper">
        <div className="navigation">
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/authentication"
          >
            Login
          </NavLink>
        </div>
      </div>
    );

  return (
    <div className="navWrapper">
      <div className="navigation">
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/butterflies"
        >
          Butterfly Collection
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/plants"
        >
          Plant Collection
        </NavLink>

        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/authentication"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}
export default NavBar;
