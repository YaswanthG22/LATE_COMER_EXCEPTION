import React from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ title, data, selected, onSelect, onDelete }) => {
  const isDeletable = !!onDelete; // True for left table

  return (
    <div className="table-card">
      <h3 className="table-title">{title}</h3>
      <table className="employee-table">
        <thead>
          <tr>
            {/* Render Select column only if not deletable (i.e., right table) */}
            {!isDeletable && <th>Select</th>}
            <th>Person Name</th>
            <th>Person No</th>
            <th>Designation</th>
            {isDeletable && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="5">No records</td>
            </tr>
          ) : (
            data.map((emp) => (
              <tr key={emp.id}>
                {/* Render checkbox only if not deletable */}
                {!isDeletable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(emp.id)}
                      onChange={() => onSelect(emp.id)}
                    />
                  </td>
                )}
                <td>{emp.name}</td>
                <td>{emp.personNo}</td>
                <td>{emp.designation}</td>
                {isDeletable && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(emp.id)}
                    >
                      ❌
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
