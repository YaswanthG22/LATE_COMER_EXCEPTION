import axios from "axios";

const BASE_URL = "http://localhost:8080";
export const LEO_BASE = `${BASE_URL}/api/late-early-out`;

/* ================= EMPLOYEES ================= */

export const getAllEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/api/employees`);
  return res.data;
};

/* ================= SUBMIT ================= */

export const submitLateEarlyOut = async (formData) => {
  try {
    const res = await axios.post(
      `${LEO_BASE}/submit-multi`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  } catch (err) {
    throw err; // 🔥 let hook handle toast / swal
  }
};

/* ================= FETCH SUBMITTED ================= */

export const getAllSubmittedRecords = async () => {
  const res = await axios.get(`${LEO_BASE}/submitted-records`);
  return res.data;
};
