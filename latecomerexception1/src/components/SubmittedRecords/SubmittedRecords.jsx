// src/components/SubmittedRecords/SubmittedRecords.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SubmittedRecords.css";

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
        {!records || records.length === 0 ? (
          <p className="no-records">No records found.</p>
        ) : (
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
              {records.map((record) => {
                const pathVal =
                  record.pdfSource ||
                  record.pdf_path ||
                  record.pdfPath;

                const hasFile = pathVal && pathVal !== "No file";
                const fileName = hasFile ? extractFileName(pathVal) : null;

                // FIXED — unique key without id
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
