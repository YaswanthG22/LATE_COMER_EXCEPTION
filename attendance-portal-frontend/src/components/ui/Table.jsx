import React from "react";
import "./Table.css";

export default function Table({ columns, data }) {
  return (
    <table className="ui-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={columns.length}>No records</td></tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
