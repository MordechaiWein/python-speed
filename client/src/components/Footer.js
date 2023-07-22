import React from "react";
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer>
      <img src={logo} />

      <div className="social-media">
        <h3>Reach us on:</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
