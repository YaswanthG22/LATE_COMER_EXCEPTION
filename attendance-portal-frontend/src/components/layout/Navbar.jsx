import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="app-navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="app-title">Attendance Exception Portal</span>

        <Link className={isActive("/")} to="/">Home</Link>
        <Link className={isActive("/late-comer")} to="/late-comer">
          Late Comer
        </Link>
        <Link className={isActive("/absentees")} to="/absentees">
          Absentees
        </Link>
        <Link className={isActive("/late-early-out")} to="/late-early-out">
          Late Early Out
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="nav-btn">About</button>
        <button className="nav-btn">Help</button>
      </div>
    </nav>
  );
};

export default Navbar;
