import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import Controls from "./components/Controls/Controls";
import { getAllEmployees, saveLateComers, saveAuthority } from "./data/api";


const App = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorityLetterNo, setAuthorityLetterNo] = useState("");
  const [authorityLetterDate, setAuthorityLetterDate] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getAllEmployees().then((data) => setAllEmployees(data));
  }, []);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleMove = () => {
    const toMove = allEmployees.filter((emp) => selectedIds.includes(emp.id));
    setSelectedEmployees([...selectedEmployees, ...toMove]);
    setAllEmployees(allEmployees.filter((emp) => !selectedIds.includes(emp.id)));
    setSelectedIds([]);
  };

  const handleDelete = (id) => {
    const empToReturn = selectedEmployees.find((e) => e.id === id);
    setAllEmployees([...allEmployees, empToReturn]);
    setSelectedEmployees(selectedEmployees.filter((e) => e.id !== id));
  };

const handleSubmit = async () => {
  const payload = {
    employees: selectedEmployees.map(emp => emp.personNo),
    fromDate,
    endDate,
    authorityDetails: `${authorityLetterNo}, ${authorityLetterDate}`,
    pdfSource: pdfFile ? pdfFile.name : null,
  };

  console.log("🧩 Sending payload to backend:", payload);

  try {
    // Step 1: Save late comer records
    await saveLateComers(payload);

    // Step 2: Save authority details + PDF info
    await saveAuthority(
      `${authorityLetterNo}, ${authorityLetterDate}`,
      pdfFile,
      selectedEmployees.map(emp => emp.personNo)
    );


    alert("✅ Data saved successfully!");
    getAllEmployees().then((data) => setAllEmployees(data));
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
            onDelete={handleDelete}
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
    </div>
  );
};

export default App;
