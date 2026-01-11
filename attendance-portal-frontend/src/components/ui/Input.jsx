import React from "react";
import "./Input.css";

export default function Input({ label, ...props }) {
  return (
    <div className="ui-input-group">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}
