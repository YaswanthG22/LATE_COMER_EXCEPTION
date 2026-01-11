import React from "react";
import "./IconTile.css";

export default function IconTile({ icon, label }) {
  return (
    <div className="icon-tile">
      <img src={icon} alt="icon" />
      <span>{label}</span>
    </div>
  );
}
