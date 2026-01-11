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
  selectedEmployees,
  onSubmit,
  uploadProgress,
  isUploading,
}) => {
  const fileInputRef = useRef(null);

  // ==========================
  // File Upload Handler
  // ==========================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Only PDF files are allowed.",
      });
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please upload a PDF smaller than 10MB.",
      });
      e.target.value = "";
      return;
    }

    setPdfFile(file);
  };

  // ==========================
  // Remove PDF File
  // ==========================
  const handleRemovePdf = () => {
    setPdfFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!pdfFile && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [pdfFile]);

  // ==========================
  // Form validation
  // ==========================
  const isFormValid =
    selectedEmployees.length > 0 &&
    fromDate &&
    endDate &&
    authorityLetterNo.trim() !== "" &&
    authorityLetterDate &&
    pdfFile &&
    !isUploading;

  return (
    <>
      <div className="controls-container">
        {/* LEFT SECTION (Dates) */}
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
              min={fromDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* MIDDLE SECTION (Authority Letter) */}
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

        {/* FILE UPLOAD SECTION */}
        <div className="file-upload small-field">
          <label className="fw-bold mb-1">Attach PDF (Max 10MB):</label>

          <div className="input-group">
            <input
              type="file"
              accept="application/pdf"
              className="form-control"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          {/* PDF Preview */}
          {pdfFile && (
            <div className="pdf-preview-card d-flex align-items-center gap-3 mt-3 p-3">
              <div className="d-flex flex-column">
                <span className="pdf-icon">📄</span>

                <a
                  href={URL.createObjectURL(pdfFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-name"
                >
                  {pdfFile.name}
                </a>
              </div>

              {!isUploading && (
                <button className="remove-btn" onClick={handleRemovePdf}>
                  ✖
                </button>
              )}
            </div>
          )}

          {/* UPLOAD PROGRESS */}
          {isUploading && (
            <div className="upload-progress mt-2">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <small className="text-muted">
                Uploading… {uploadProgress}%
              </small>
            </div>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="submit-container">
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={!isFormValid}
        >
          {isUploading ? "Uploading…" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default Controls;
