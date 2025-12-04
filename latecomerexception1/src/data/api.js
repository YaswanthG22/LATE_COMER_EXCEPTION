import axios from "axios";
import { toast } from "react-toastify";

// ======================
// 👤 Employee API
// ======================
const EMPLOYEE_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(EMPLOYEE_URL);
    return response.data;
  } catch (error) {
    toast.error("Failed to load employees!");
    return [];
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(EMPLOYEE_URL, employee);
    toast.success("Employee added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add employee!");
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${EMPLOYEE_URL}/${id}`);
    toast.success("Employee deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete employee!");
    throw error;
  }
};

// ======================
// 🕒 Full Atomic Late Comer Submit
// ======================
const LATECOMER_URL = "http://localhost:8080/api/latecomer";

export const submitFullData = async (lateComers, authorityDetails, pdfFile) => {
  try {
    const formData = new FormData();

    // multipart JSON
    formData.append(
      "lateComers",
      new Blob([JSON.stringify(lateComers)], { type: "application/json" })
    );

    formData.append("authorityDetails", authorityDetails);
    formData.append("pdfFile", pdfFile);

    const response = await axios.post(
      `${LATECOMER_URL}/full-submit`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Saved successfully!");
    return response.data;

  } catch (error) {
    toast.error("Failed to save data!");
    throw error;
  }
};

// ======================
// 📋 Submitted Records API
// ======================
const SUBMITTED_URL = "http://localhost:8080/api/submitted-records";

export const getAllSubmittedRecords = async () => {
  try {
    const response = await axios.get(`${SUBMITTED_URL}/all`);
    return response.data;
  } catch (error) {
    toast.error("Unable to fetch submitted records!");
    return [];
  }
};

// ======================
// 🧾 Authority Documents (list only)
// ======================
const AUTHORITY_URL = "http://localhost:8080/api/authority";

export const getAllAuthorities = async () => {
  try {
    const response = await axios.get(`${AUTHORITY_URL}/all`);
    return response.data;
  } catch (error) {
    toast.error("Failed to load authority documents!");
    throw error;
  }
};
