import React from "react";
import "./Controls.css";

const Controls = ({
  fromDate,
  setFromDate,
  endDate,
  setEndDate,
  authorityLetterNo,
  setAuthorityLetterNo,
  authorityLetterDate,
  setAuthorityLetterDate,
  pdfFile,
  setPdfFile,
  onSubmit,
  selectedEmployees,
}) => {
  // 📁 Handle PDF upload (max 10MB)
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size <= 10 * 1024 * 1024) { // limit 10MB
    // ✅ Keep the original file as uploaded
    setPdfFile(file);
  } else {
    alert("Please upload a PDF less than 10MB.");
  }
};


  // 🗑️ Handle PDF removal
  const handleRemovePdf = () => {
    setPdfFile(null);
    document.getElementById("pdf-upload").value = "";
  };

  // ✅ Validation
  const isFormValid =
    selectedEmployees.length > 0 &&
    fromDate.trim() !== "" &&
    endDate.trim() !== "" &&
    authorityLetterNo.trim() !== "" &&
    authorityLetterDate.trim() !== "" &&
    pdfFile !== null;

  return (
    <>
      <div className="controls-container">
        {/* Left section (Dates) */}
        <div className="left-section">
          <div className="date-field small-field">
            <label>From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="date-field small-field">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              min={fromDate}  // ⬅ prevents selecting a date before 'fromDate'
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Middle section (Authority Info) */}
        <div className="middle-section">
          <div className="date-field small-field">
            <label>Authority Letter No:</label>
            <input
              type="text"
              value={authorityLetterNo}
              onChange={(e) => setAuthorityLetterNo(e.target.value)}
              placeholder="Enter letter number"
            />
          </div>

          <div className="date-field small-field">
            <label>Authority Letter Date:</label>
            <input
              type="date"
              value={authorityLetterDate}
              onChange={(e) => setAuthorityLetterDate(e.target.value)}
            />
          </div>
        </div>

        {/* Right section (File upload) */}
        <div className="file-upload small-field">
          <label>Attach PDF (Max 10MB):</label>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {pdfFile && (
            <div className="pdf-preview">
              {/* ✅ Show file name as hyperlink */}
              <a
                href={URL.createObjectURL(pdfFile)}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
                title="Click to preview PDF"
              >
                {pdfFile.name}
              </a>

              {/* ❌ Remove button */}
              <button
                className="remove-btn"
                onClick={handleRemovePdf}
                title="Remove attached file"
              >
                ❌ Remove
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Submit button centered below all fields */}
      <div className="submit-container">
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={!isFormValid}
          title={!isFormValid ? "Please fill all fields and upload a PDF" : ""}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Controls;
