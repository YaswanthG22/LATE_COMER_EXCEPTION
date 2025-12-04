// src/components/SubmittedRecords/SubmittedRecords.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SubmittedRecords.css";

const extractFileName = (path) => {
  if (!path) return "";
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1];
};

const SubmittedRecords = ({ records }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Calculate pages
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = records.slice(startIndex, startIndex + recordsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="records-section">
      <h2>All Submitted Records</h2>

      <div className="records-table-wrapper">
        {!records || records.length === 0 ? (
          <p className="no-records">No records found.</p>
        ) : (
          <>
            <table className="records-table">
              <thead>
                <tr>
                  <th>Person No</th>
                  <th>Date Range</th>
                  <th>Authority Details</th>
                  <th>PDF</th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.map((record) => {
                  const pathVal =
                    record.pdfSource ||
                    record.pdf_path ||
                    record.pdfPath;

                  const hasFile = pathVal && pathVal !== "No file";
                  const fileName = hasFile ? extractFileName(pathVal) : null;

                  const rowKey =
                    record.personNo +
                    "_" +
                    record.recordDate.replace(/\s|→/g, "_");

                  return (
                    <tr key={rowKey}>
                      <td>{record.personNo}</td>
                      <td>{record.recordDate}</td>
                      <td>{record.authorityDetails}</td>

                      <td>
                        {hasFile ? (
                          <a
                            href={`http://localhost:8080/api/files/${encodeURIComponent(
                              fileName
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdf-link"
                          >
                            {fileName}
                          </a>
                        ) : (
                          "No file"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={currentPage === pageNum ? "active" : ""}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

SubmittedRecords.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object),
};

SubmittedRecords.defaultProps = {
  records: [],
};

export default SubmittedRecords;
