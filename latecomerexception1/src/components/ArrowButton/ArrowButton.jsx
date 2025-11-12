import React from "react";
import "./ArrowButton.css";

const ArrowButton = ({ onClick, disabled }) => {
  return (
    <div className="arrow-container">
      <button className="arrow-btn" onClick={onClick} disabled={disabled}>
        ⬅
      </button>
    </div>
  );
};

export default ArrowButton;
