import React from "react";
import "./Modal.css";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>

        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
