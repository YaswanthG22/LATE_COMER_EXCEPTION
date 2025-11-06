// import React from "react";
// import "./Controls.css";

// const Controls = ({
//   fromDate,
//   setFromDate,
//   endDate,
//   setEndDate,
//   desc,
//   setDesc,
//   onSubmit,
//   selectedEmployees,
// }) => {

//   // Validation: Check if form is valid
//   const isFormValid = 
//     selectedEmployees.length > 0 &&
//     fromDate.trim() !== "" &&
//     endDate.trim() !== "" &&
//     desc.trim() !== "";

//   return (
//     <div className="controls-container">
//       <div className="input-row">
//         <div className="date-field">
//           <label>Date:</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />

//           <label style={{ marginLeft: "20px" }}>End Date:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         <div className="description-field">
//           <label>Description:</label>
//           <textarea
//             rows="3"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="submit-container">
//         <button
//           onClick={onSubmit}
//           className="submit-btn"
//           disabled={!isFormValid}
//           title={!isFormValid ? "Please select employees, date, and description" : ""}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Controls;

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
    const currentDate = new Date().toISOString().split('T')[0]; // e.g., 2025-11-05
    const employeeName = selectedEmployees.length > 0 ? selectedEmployees[0].name.replace(/\s+/g, '_') : 'unknown';
    const newFileName = `${employeeName}_${currentDate}.pdf`;

    // Rename file (we’ll send this new name to backend)
    const renamedFile = new File([file], newFileName, { type: file.type });
    setPdfFile(renamedFile);
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
              <span>{pdfFile.name}</span>
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
