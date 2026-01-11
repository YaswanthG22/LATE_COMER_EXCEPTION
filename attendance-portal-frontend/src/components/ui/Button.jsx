import React from "react";
import "./Button.css";

export default function Button({ children, onClick, disabled, type = "button" }) {
  return (
    <button
      type={type}
      className={`ui-btn ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
