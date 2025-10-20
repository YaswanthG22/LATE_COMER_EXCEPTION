import React from "react";
import "./Controls.css";

const Controls = ({ date, setDate, desc, setDesc, onSubmit, selectedEmployees }) => {
  // Validation: Check if form is valid
  const isFormValid = 
    selectedEmployees.length > 0 &&
    date.trim() !== "" &&
    desc.trim() !== "";

  return (
    <div className="controls-container">
      <div className="input-row">
        <div className="date-field">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="description-field">
          <label>Description:</label>
          <textarea
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-container">
        <button
          onClick={onSubmit}
          className="submit-btn"
          disabled={!isFormValid}
          title={!isFormValid ? "Please select employees, date, and description" : ""}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Controls;
