import axios from "axios";

// ======================
// 👤 Employee API
// ======================
const EMPLOYEE_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async () => {
  const response = await axios.get(EMPLOYEE_URL);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(EMPLOYEE_URL, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${EMPLOYEE_URL}/${id}`);
};

// ======================
// 🕒 Late Comer Exception API
// ======================
const LATECOMER_URL = "http://localhost:8080/api/latecomer";

export const saveLateComers = async (payload) => {
  try {
    // Debug log to confirm what’s being sent
    console.log("📦 Sending payload to backend:", payload);

    // Send JSON data
    const response = await axios.post(`${LATECOMER_URL}/save`, payload);

    // Log backend response
    console.log("✅ Server response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Error saving late comers:", error);
    throw error;
  }
};

// ======================
// 🧾 Authority Document API
// ======================

export const saveAuthority = async (authorityDetails, pdfFile, employees) => {
  try {
    const formData = new FormData();
    formData.append("authorityDetails", authorityDetails);
    formData.append("pdfFile", pdfFile);

    // ✅ Append each employee number separately (Spring reads it as a list)
    employees.forEach(emp => formData.append("employees", emp));

    console.log("📎 Uploading authority document for employees:", employees);

    const response = await axios.post(
      "http://localhost:8080/api/authority/save",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Authority document saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving authority document:", error);
    throw error;
  }
};






// ✅ Mock API — no backend required

// let employees = [
//   { id: 1, name: "John Doe", personNo: "EMP101", designation: "Engineer" },
//   { id: 2, name: "Jane Smith", personNo: "EMP102", designation: "Analyst" },
//   { id: 3, name: "Michael Brown", personNo: "EMP103", designation: "Technician" },
//   { id: 4, name: "Emily Davis", personNo: "EMP104", designation: "HR Manager" },
//   { id: 5, name: "Daniel Johnson", personNo: "EMP105", designation: "Developer" },
//   { id: 6, name: "Sophia Wilson", personNo: "EMP106", designation: "Tester" },
//   { id: 7, name: "Robert Lee", personNo: "EMP107", designation: "Team Lead" },
//   { id: 8, name: "Olivia Harris", personNo: "EMP108", designation: "Designer" },
// ];

// // mimic server delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export const getAllEmployees = async () => {
//   await delay(200); // simulate API delay
//   return [...employees];
// };

// export const addEmployee = async (employee) => {
//   await delay(200);
//   const newEmployee = { ...employee, id: employees.length + 1 };
//   employees.push(newEmployee);
//   return newEmployee;
// };

// export const deleteEmployee = async (id) => {
//   await delay(200);
//   employees = employees.filter((emp) => emp.id !== id);
// };
