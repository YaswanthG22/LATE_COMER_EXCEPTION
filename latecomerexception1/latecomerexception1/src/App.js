import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import Controls from "./components/Controls/Controls";
import { getAllEmployees } from "./data/api";

const App = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

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

  const handleSubmit = () => {
    console.log("Submitting:", {
      selectedEmployees,
      date,
      desc,
    });
    getAllEmployees().then((data) => setAllEmployees(data));
    setSelectedEmployees([]);
    setDate("");
    setDesc("");
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
        date={date}
        setDate={setDate}
        desc={desc}
        setDesc={setDesc}
        onSubmit={handleSubmit}
        selectedEmployees={selectedEmployees}
      />
    </div>
  );
};

export default App;
