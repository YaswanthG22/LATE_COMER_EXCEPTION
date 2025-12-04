import React, { useRef, useEffect } from "react";
import "./Controls.css";
import Swal from "sweetalert2";


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
  const fileInputRef = useRef(null);

  // PDF upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setPdfFile(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please upload a PDF smaller than 10MB.",
        confirmButtonColor: "#2563eb",
        background: "#ffffff",
      });

      e.target.value = "";
    }
  };


  // Remove PDF
  const handleRemovePdf = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto reset input after removing
  useEffect(() => {
    if (!pdfFile && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [pdfFile]);

  const isFormValid =
    selectedEmployees.length > 0 &&
    fromDate &&
    endDate &&
    authorityLetterNo.trim() !== "" &&
    authorityLetterDate &&
    pdfFile !== null;

  return (
    <>
      <div className="controls-container">

        {/* LEFT SECTION */}
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
              min={fromDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* MIDDLE SECTION */}
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

        {/* RIGHT SECTION - FILE UPLOAD */}
        <div className="file-upload small-field">
          <label className="fw-bold mb-1">Attach PDF (Max 10MB):</label>

          <div className="input-group">
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          {/* New Modern PDF Preview */}
          {pdfFile && (
            <div className="pdf-preview-card d-flex align-items-center gap-3 mt-3 p-3">
              
              <div className="d-flex flex-column">
                <span className="pdf-icon">📄</span>
                <a
                  href={URL.createObjectURL(pdfFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-name"
                  title={pdfFile.name}
                >
                  {pdfFile.name}
                </a>
              </div>

              <button
                className="remove-btn"
                onClick={handleRemovePdf}
                title="Remove attached file"
              >
                ✖
              </button>
            </div>
          )}
        </div>

      </div>

      {/* SUBMIT BUTTON SECTION */}
      <div className="submit-container">
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Controls;
