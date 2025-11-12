// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import Controls from "./components/Controls/Controls";
import SubmittedRecords from "./components/SubmittedRecords/SubmittedRecords";
import {
  getAllEmployees,
  saveLateComers,
  saveAuthority,
  getAllSubmittedRecords,
} from "./data/api";

const App = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorityLetterNo, setAuthorityLetterNo] = useState("");
  const [authorityLetterDate, setAuthorityLetterDate] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [searchPersonNo, setSearchPersonNo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLetterNo, setSearchLetterNo] = useState("");

  useEffect(() => {
    getAllEmployees().then((data) => setAllEmployees(data || []));
    loadSubmittedRecords();
  }, []);

  const loadSubmittedRecords = async () => {
    try {
      const data = await getAllSubmittedRecords();
      setSubmittedRecords(data || []);
      setFilteredRecords(data || []);
    } catch (e) {
      console.error("Failed to load submitted records", e);
      setSubmittedRecords([]);
      setFilteredRecords([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleMove = () => {
    const toMove = allEmployees.filter((emp) => selectedIds.includes(emp.id));
    setSelectedEmployees((prev) => [...prev, ...toMove]);
    setAllEmployees(allEmployees.filter((emp) => !selectedIds.includes(emp.id)));
    setSelectedIds([]);
  };

  const handleDeleteFromSelected = (id) => {
    const empToReturn = selectedEmployees.find((e) => e.id === id);
    setAllEmployees((prev) => [...prev, empToReturn]);
    setSelectedEmployees(selectedEmployees.filter((e) => e.id !== id));
  };

  const handleSubmit = async () => {
    const authorityDetails = `${authorityLetterNo}, ${authorityLetterDate}`;
    const payload = {
      employees: selectedEmployees.map((emp) => emp.personNo),
      fromDate,
      endDate,
      authorityDetails,
      pdfSource: pdfFile ? pdfFile.name : null,
    };

    try {
      await saveLateComers(payload);
      await saveAuthority(authorityDetails, pdfFile);

      alert("✅ Data saved successfully!");
      await loadSubmittedRecords();
      const refreshed = await getAllEmployees();
      setAllEmployees(refreshed);

      setSelectedEmployees([]);
      setFromDate("");
      setEndDate("");
      setAuthorityLetterNo("");
      setAuthorityLetterDate("");
      setPdfFile(null);
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Failed to save data. Check console for details.");
    }
  };

  // Helpers + Search functions (same as before)
  const isDateInRange = (rangeStr, targetISO) => {
    if (!rangeStr || !targetISO) return true;
    const parts = rangeStr.split("→").map((s) => s.trim());
    if (parts.length !== 2) return true;
    const from = parts[0];
    const to = parts[1];
    return from <= targetISO && targetISO <= to;
  };

  const handleSearch = () => {
    let results = submittedRecords;

    if (searchPersonNo.trim()) {
      results = results.filter((r) =>
        (r.personNo || "").toLowerCase().includes(searchPersonNo.toLowerCase())
      );
    }

    if (searchDate.trim()) {
      results = results.filter((r) => isDateInRange(r.recordDate, searchDate));
    }

    if (searchLetterNo.trim()) {
      const needle = searchLetterNo.toLowerCase();
      results = results.filter((r) =>
        (r.authorityDetails || "").toLowerCase().includes(needle)
      );
    }

    setFilteredRecords(results);
  };

  const handleResetSearch = () => {
    setSearchPersonNo("");
    setSearchDate("");
    setSearchLetterNo("");
    setFilteredRecords(submittedRecords);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Late Comer Exception</h1>
      </header>

      <main className="main-area">
        <div className="left-col">
          <EmployeeTable
            title="Selected Employees"
            data={selectedEmployees}
            selected={[]}
            onSelect={() => {}}
            onDelete={handleDeleteFromSelected}
          />
        </div>

        <div className="center-col">
          <ArrowButton onClick={handleMove} disabled={selectedIds.length === 0} />
        </div>

        <div className="right-col">
          <EmployeeTable
            title="All Employees"
            data={allEmployees}
            selected={selectedIds}
            onSelect={handleSelect}
          />
        </div>
      </main>

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
        onSubmit={handleSubmit}
        selectedEmployees={selectedEmployees}
      />

      {/* Search filters (left in App so it controls the filters) */}
      <section className="records-filters">
        <div className="filter-row">
          <div className="filter-item">
            <label>Person No</label>
            <input
              type="text"
              placeholder="Enter person number"
              value={searchPersonNo}
              onChange={(e) => setSearchPersonNo(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Letter No</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Search by letter number"
                value={searchLetterNo}
                onChange={(e) => setSearchLetterNo(e.target.value)}
              />
              <select
                onChange={(e) => setSearchLetterNo(e.target.value)}
                value={searchLetterNo}
              >
                <option value="">Select letter no</option>
                {[...new Set(submittedRecords.map((r) => (r.authorityDetails || "").split(",")[0]))]
                  .filter(Boolean)
                  .map((letterNo, idx) => (
                    <option key={idx} value={letterNo}>
                      {letterNo}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button onClick={handleSearch} className="filter-btn go">
            Go
          </button>
          <button onClick={handleResetSearch} className="filter-btn reset">
            Reset
          </button>
        </div>
      </section>

      {/* NEW: use separated component */}
      <SubmittedRecords records={filteredRecords} />
    </div>
  );
};

export default App;
