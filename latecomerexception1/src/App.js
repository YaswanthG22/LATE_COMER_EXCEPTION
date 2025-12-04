// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import Controls from "./components/Controls/Controls";
import SubmittedRecords from "./components/SubmittedRecords/SubmittedRecords";
import RecordsFilter from "./components/RecordsFilter/RecordsFilter";

import useEmployees from "./components/Employees/useEmployees";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const {
    allEmployees,
    selectedEmployees,
    moveEmployee,
    deleteEmployee,

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

    filteredRecords,
    searchState,
    setSearchState,
    letterNoOptions,

    handleSubmit,
  } = useEmployees();

  return (
    <div className="app-container min-vh-100">
      {/* Header */}
      <header className="py-3 bg-white shadow-sm mb-4">
        <h1 className="text-center fw-bold text-primary">
          Late Comer Exception
        </h1>
      </header>

      <div className="container">

        {/* ================= Employee Tables ================= */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <EmployeeTable
                  title="Selected Employees"
                  data={selectedEmployees}
                  onDelete={deleteEmployee}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <EmployeeTable
                  title="All Employees"
                  data={allEmployees}
                  onMove={moveEmployee}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Controls Section ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <Controls
              fromDate={fromDate}
              setFromDate={setFromDate}
              endDate={endDate}
              setEndDate={setEndDate}
              authorityLetterNo={authorityLetterNo}
              setAuthorityLetterNo={setAuthorityLetterNo}
              authorityLetterDate={authorityLetterDate}
              setAuthorityLetterDate={setAuthorityLetterDate}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              selectedEmployees={selectedEmployees}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        {/* ================= Filters Section ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <RecordsFilter
              searchState={searchState}
              setSearchState={setSearchState}
              letterNoOptions={letterNoOptions}
            />
          </div>
        </div>

        {/* ================= Submitted Records ================= */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <SubmittedRecords records={filteredRecords} />
          </div>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default App;
