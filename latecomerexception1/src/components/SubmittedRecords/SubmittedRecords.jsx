// src/components/SubmittedRecords/SubmittedRecords.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SubmittedRecords.css"; // optional - create for styling if needed

/**
 * Props
 * - records: array of { id, personNo, recordDate, authorityDetails, pdfSource }
 * - onSearchChange/select etc. -> not required here; component is read-only
 *
 * NOTE: This component expects a backend route to serve files:
 *   GET http://localhost:8080/api/files/{encodedFilename}
 * If your backend exposes a different route, change `fileBaseUrl`.
 */
const fileBaseUrl = "http://localhost:8080/api/files/"; // <-- adjust if backend uses different path

const extractFileName = (path) => {
  if (!path) return "";
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1];
};

const SubmittedRecords = ({ records }) => {
  return (
    <section className="records-section">
      <h2>All Submitted Records</h2>

      <div className="records-table-wrapper">
        {(!records || records.length === 0) ? (
          <p className="no-records">No records found.</p>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Person No</th>
                <th>Date Range</th>
                <th>Authority Details</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const pathVal = record.pdfSource || record.pdf_path || record.pdfPath;
                const hasFile = pathVal && pathVal !== "No file";
                const fileName = hasFile ? extractFileName(pathVal) : null;
                const href = hasFile
                ? `http://localhost:8080/api/files/${encodeURIComponent(fileName)}`
                : null;


                return (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.personNo}</td>
                    <td>{record.recordDate}</td>
                    <td>{record.authorityDetails}</td>
                    <td>
                      {hasFile ? (
                        <a
                          href={href}
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
