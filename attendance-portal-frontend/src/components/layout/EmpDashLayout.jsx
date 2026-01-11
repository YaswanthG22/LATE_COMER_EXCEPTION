import React from "react";

const EmpDashLayout = ({ children }) => {
  return (
    <div className="empdash">
      {/* background glow */}
      <div className="empdash-bg-circle empdash-bg-1" />
      <div className="empdash-bg-circle empdash-bg-2" />

      <div className="empdash-container">
        {children}
      </div>
    </div>
  );
};

export default EmpDashLayout;
