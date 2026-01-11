import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="main-title">Attendance Exception Portal</h1>

      <div className="module-grid">
        <Link className="module-card" to="/late-comer">
          <img src="/icons/latecomer.svg" alt="Late Comer" />
          <p>Late Comer Exception</p>
        </Link>

        <Link className="module-card" to="/absentees">
          <img src="/icons/absentees.svg" alt="Absentees" />
          <p>Absentees Exception</p>
        </Link>

        <Link className="module-card" to="/late-early-out">
          <img src="/icons/lateearlyout.svg" alt="Late Early Out" />
          <p>Late Early Out Exception</p>
        </Link>
      </div>
    </div>
  );
}
