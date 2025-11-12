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
// ✅ Backend base URL for latecomer APIs
const LATECOMER_URL = "http://localhost:8080/api/latecomer";

/**
 * ✅ Save Late Comers (Triggered when you click Submit)
 * Backend endpoint: POST /api/latecomer/save
 */
export const saveLateComers = async (payload) => {
  try {
    console.log("📦 Sending payload to backend:", payload);
    const response = await axios.post(`${LATECOMER_URL}/save`, payload);
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving late comers:", error);
    throw error;
  }
};

// ✅ Fetch all joined LateComer + Authority data (not from /latecomer/all)
const SUBMITTED_URL = "http://localhost:8080/api/submitted-records";

/**
 * ✅ Get all submitted records from backend
 * Backend endpoint: GET /api/submitted-records/all
 */
export const getAllSubmittedRecords = async () => {
  try {
    const response = await axios.get(`${SUBMITTED_URL}/all`);
    console.log("📋 All submitted records fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching submitted records:", error);
    return [];
  }
};

// ======================
// 🧾 Authority Document API
// ======================
const AUTHORITY_URL = "http://localhost:8080/api/authority";

/**
 * ✅ Save Authority Document
 * Backend endpoint: POST /api/authority/save
 * Oracle column name: PDF_PATH (not PDF_SOURCE)
 */
export const saveAuthority = async (authorityDetails, pdfFile) => {
  try {
    const formData = new FormData();
    formData.append("authorityDetails", authorityDetails);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    console.log("📎 Uploading authority document:", pdfFile?.name);

    const response = await axios.post(`${AUTHORITY_URL}/save`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Authority document saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving authority document:", error);
    throw error;
  }
};

/**
 * ✅ Get all Authority Documents
 * Backend endpoint: GET /api/authority/all
 */
export const getAllAuthorities = async () => {
  try {
    const response = await axios.get(`${AUTHORITY_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching authorities:", error);
    throw error;
  }
};


// ✅ Update authority document
// export const updateAuthority = async (id, authorityDetails, pdfFile) => {
//   try {
//     const formData = new FormData();
//     formData.append("authorityDetails", authorityDetails);
//     if (pdfFile) formData.append("pdfFile", pdfFile);

//     const response = await axios.put(`${AUTHORITY_URL}/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     console.log("✅ Authority updated:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error updating authority document:", error);
//     throw error;
//   }
// };

// ✅ Delete authority document
// export const deleteAuthority = async (id) => {
//   try {
//     const response = await axios.delete(`${AUTHORITY_URL}/${id}`);
//     console.log("🗑️ Authority deleted:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error deleting authority document:", error);
//     throw error;
//   }
// };


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
