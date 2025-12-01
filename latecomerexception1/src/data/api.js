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
// 🕒 Late Comer API (UPDATED)
// ======================
const LATECOMER_URL = "http://localhost:8080/api/latecomer";

/**
 * Accepts array of late comer objects
 * [
 *   { personNo, recordDate, authorityDetails, insertedDate },
 *   ...
 * ]
 */
export const saveLateComers = async (lateComers) => {
  try {
    const response = await axios.post(`${LATECOMER_URL}/save`, lateComers);
    toast.success("Late comers saved successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to save late comers!");
    throw error;
  }
};

// ======================
// 📋 Submitted Records
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
// 🧾 Authority Docs API
// ======================
const AUTHORITY_URL = "http://localhost:8080/api/authority";

export const saveAuthority = async (authorityDetails, pdfFile) => {
  try {
    const formData = new FormData();
    formData.append("authorityDetails", authorityDetails);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    const response = await axios.post(`${AUTHORITY_URL}/save`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Authority document saved successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to save authority document!");
    throw error;
  }
};

export const getAllAuthorities = async () => {
  try {
    const response = await axios.get(`${AUTHORITY_URL}/all`);
    return response.data;
  } catch (error) {
    toast.error("Failed to load authority documents!");
    throw error;
  }
};
