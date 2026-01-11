import axios from "axios";

const BASE_URL = "http://localhost:8080";
export const ABSENTEES_BASE = `${BASE_URL}/api/absentees`;

/* ================= EMPLOYEES ================= */

export const getAllEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/api/employees`);
  return res.data;
};

/* ================= SUBMIT ABSENTEES ================= */

export const submitAbsentees = async (formData) => {
  try {
    const res = await axios.post(
      `${ABSENTEES_BASE}/submit-multi`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (err) {
    throw err; // 🔥 let hook decide UI
  }
};

/* ================= FETCH SUBMITTED ================= */

export const getAllSubmittedRecords = async () => {
  const res = await axios.get(`${ABSENTEES_BASE}/submitted-records`);
  return res.data;
};
