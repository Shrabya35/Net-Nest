import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import LOGO from "../img/logo.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={LOGO} className="nav-logo" alt="logo" />
          </Link>
        </div>
        <div className="nav-menu">
          <li>
            <Link to="/" className="nav-item">
              Matches
            </Link>
          </li>
          <li>
            <Link to="/standings" className="nav-item">
              Standings
            </Link>
          </li>
          <li>
            <Link to="/stats" className="nav-item">
              Stats
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-item">
              Players
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
