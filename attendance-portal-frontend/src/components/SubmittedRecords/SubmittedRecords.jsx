// src/components/SubmittedRecords/SubmittedRecords.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SubmittedRecords.css";

const BACKEND_BASE_URL = "http://localhost:8080";

const SubmittedRecords = ({ records = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = records.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  /**
   * Safely open PDF in new tab
   * - Handles relative & absolute URLs
   * - Encodes filename only
   * - Avoids popup blocking
   */
  const openPdf = (pdfSource) => {
    if (!pdfSource) return;

    let finalUrl = pdfSource.trim();

    // ✅ If backend returned relative path, prefix backend URL
    if (!finalUrl.startsWith("http")) {
      finalUrl = `${BACKEND_BASE_URL}${finalUrl}`;
    }

    // Encode ONLY the filename
    const parts = finalUrl.split("/");
    const fileName = parts.pop();
    const encodedFileName = encodeURIComponent(fileName);

    const safeUrl = [...parts, encodedFileName].join("/");

    // ✅ Open via user action (no popup block)
    window.open(safeUrl, "_blank", "noopener,noreferrer");
  };

  if (!records.length) {
    return <p className="no-records">No records found.</p>;
  }

  return (
    <section className="records-section">
      <h2>All Submitted Records</h2>

      <table className="records-table">
        <thead>
          <tr>
            <th>Person No</th>
            <th>Date / Date Range</th>
            <th>Authority Details</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {currentRecords.map((record, idx) => {
            if (!record.pdfSource) {
              return (
                <tr key={idx}>
                  <td>{record.personNo || "-"}</td>
                  <td>{record.recordDate || "-"}</td>
                  <td>{record.authorityDetails || "-"}</td>
                  <td>No file</td>
                </tr>
              );
            }

            const fileName = record.pdfSource.split("/").pop();

            return (
              <tr key={`${record.personNo || "row"}_${idx}`}>
                <td>{record.personNo || "-"}</td>
                <td>{record.recordDate || "-"}</td>
                <td>{record.authorityDetails || "-"}</td>
                <td>
                  <button
                    type="button"
                    className="pdf-link"
                    onClick={() => openPdf(record.pdfSource)}
                  >
                    {decodeURIComponent(fileName).replace(/\+/g, " ")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

SubmittedRecords.propTypes = {
  records: PropTypes.array,
};

export default SubmittedRecords;
