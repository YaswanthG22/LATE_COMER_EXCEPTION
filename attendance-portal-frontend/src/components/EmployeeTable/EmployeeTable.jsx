import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ title, data = [], onDelete, onMove }) => {
  const isSelectedTable = !!onDelete;
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const safe = (data || []).filter(
      (emp) => emp && emp.personNo && emp.name && emp.designation
    );
    setFiltered(safe);
  }, [data]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(
        (data || []).filter(
          (emp) => emp && emp.personNo && emp.name && emp.designation
        )
      );
    } else {
      const s = search.toLowerCase();
      setFiltered(
        (data || []).filter(
          (emp) =>
            emp &&
            emp.name &&
            emp.personNo &&
            (emp.name.toLowerCase().includes(s) ||
              emp.personNo.toLowerCase().includes(s))
        )
      );
    }
  }, [search, data]);

  return (
    <div className="table-card">
      <h3 className="table-title">{title}</h3>

      {!isSelectedTable && (
        <input
          type="text"
          className="employee-search"
          placeholder="Search by name or person no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Person Name</th>
            <th>Person No</th>
            <th>Designation</th>
            {isSelectedTable && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="4">No records</td>
            </tr>
          ) : (
            filtered.map((emp) => (
              <tr key={emp.personNo}>
                <td>
                  {!isSelectedTable ? (
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        onMove?.(emp);
                        setSearch("");
                      }}
                    >
                      {emp.name}
                    </button>
                  ) : (
                    emp.name
                  )}
                </td>

                <td>{emp.personNo}</td>
                <td>{emp.designation}</td>

                {isSelectedTable && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete?.(emp.personNo)}
                    >
                      Delete
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
