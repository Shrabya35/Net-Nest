import React from "react";
import "./Layout.css";
import LOGO from "../img/logo.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="nav-container">
        <div className="logo">
          <a href="/">
            <img src={LOGO} className="nav-logo" alt="logo" />
          </a>
        </div>
        <div className="nav-menu">
          <li>
            <a href="/" className="nav-item">
              Matches
            </a>
          </li>
          <li>
            <a href="/standings" className="nav-item">
              Standings
            </a>
          </li>
          <li>
            <a href="/stats" className="nav-item">
              Stats
            </a>
          </li>
          <li>
            <a href="/" className="nav-item">
              Players
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
