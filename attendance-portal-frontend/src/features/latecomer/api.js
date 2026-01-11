import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8080";

const EMPLOYEE_URL = `${BASE_URL}/api/employees`;
const SUBMITTED_URL = `${BASE_URL}/api/submitted-records/all`;
const FULL_SUBMIT_URL = `${BASE_URL}/api/latecomer/full-submit`;

export const getAllEmployees = async () => {
  try {
    const res = await axios.get(EMPLOYEE_URL);
    return res.data;
  } catch (err) {
    toast.error("Failed to load employees!");
    return [];
  }
};

export const submitFullData = async (
  records,
  authorityDetails,
  pdfFile,
  onUploadProgress
) => {
  try {
    const formData = new FormData();

    formData.append(
      "records",
      new Blob([JSON.stringify(records)], {
        type: "application/json",
      })
    );

    formData.append("authorityDetails", authorityDetails);

    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

    const res = await axios.post(FULL_SUBMIT_URL, formData, {
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percent);
        }
      },
    });

    return res.data;
  } catch (err) {
    // 🔥 LET UI HANDLE MESSAGE
    throw err;
  }
};

export const getAllSubmittedRecords = async () => {
  try {
    const res = await axios.get(SUBMITTED_URL);
    return res.data;
  } catch (err) {
    toast.error("Unable to fetch submitted records!");
    return [];
  }
};
