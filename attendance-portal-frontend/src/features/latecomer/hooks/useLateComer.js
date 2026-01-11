import { useState, useEffect, useMemo } from "react";
import {
  getAllEmployees,
  getAllSubmittedRecords,
  submitFullData,
} from "../api.js";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const useLateComer = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorityLetterNo, setAuthorityLetterNo] = useState("");
  const [authorityLetterDate, setAuthorityLetterDate] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [searchState, setSearchState] = useState({
    personNo: "",
    date: "",
    letterNo: "",
  });

  useEffect(() => {
    loadEmployees();
    loadSubmitted();
  }, []);

  const loadEmployees = async () => {
    setAllEmployees(await getAllEmployees());
  };

  const loadSubmitted = async () => {
    const data = await getAllSubmittedRecords();
    setSubmittedRecords(data);
    setFilteredRecords(data);
  };

  const moveEmployee = (emp) => {
    setSelectedEmployees((prev) => [...prev, emp]);
    setAllEmployees((prev) =>
      prev.filter((e) => e.personNo !== emp.personNo)
    );
  };

  const deleteEmployee = (personNo) => {
    const emp = selectedEmployees.find((e) => e.personNo === personNo);
    if (!emp) return;

    setAllEmployees((p) => [...p, emp]);
    setSelectedEmployees((p) =>
      p.filter((e) => e.personNo !== personNo)
    );
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!selectedEmployees.length) {
      toast.error("Please select at least one employee!");
      return;
    }

    if (!fromDate || !endDate) {
      toast.error("Please select a valid date range!");
      return;
    }

    if (!authorityLetterNo.trim() || !authorityLetterDate) {
      toast.error("Enter letter number and date!");
      return;
    }

    if (!pdfFile) {
      toast.error("Please attach the PDF!");
      return;
    }

    const authorityDetails = `${authorityLetterNo}, ${authorityLetterDate}`;
    const insertedDate = new Date().toISOString().split("T")[0];

    const records = [];

    selectedEmployees.forEach((emp) => {
      let current = new Date(fromDate);
      const end = new Date(endDate);

      while (current <= end) {
        records.push({
          personNo: emp.personNo,
          recordDate: current.toISOString().split("T")[0],
          authorityDetails,
          insertedDate,
        });
        current.setDate(current.getDate() + 1);
      }
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);

      await submitFullData(
        records,
        authorityDetails,
        pdfFile,
        setUploadProgress
      );

      toast.success("Late Comer records submitted successfully!");

      await loadSubmitted();
      await loadEmployees();

      setSelectedEmployees([]);
      setFromDate("");
      setEndDate("");
      setAuthorityLetterNo("");
      setAuthorityLetterDate("");
      setPdfFile(null);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          typeof err?.response?.data === "string"
            ? err.response.data
            : err?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    const { personNo, date, letterNo } = searchState;
    let results = submittedRecords;

    if (personNo.trim()) {
      results = results.filter((r) =>
        (r.personNo || "")
          .toLowerCase()
          .includes(personNo.toLowerCase())
      );
    }

    if (date.trim()) {
      results = results.filter((r) => r.recordDate === date);
    }

    if (letterNo.trim()) {
      results = results.filter((r) =>
        (r.authorityDetails || "")
          .toLowerCase()
          .includes(letterNo.toLowerCase())
      );
    }

    setFilteredRecords(results);
  }, [searchState, submittedRecords]);

  const letterNoOptions = useMemo(() => {
    return [
      ...new Set(
        submittedRecords.map((r) =>
          (r.authorityDetails || "").split(",")[0].trim()
        )
      ),
    ].filter(Boolean);
  }, [submittedRecords]);

  return {
    allEmployees,
    selectedEmployees,

    fromDate,
    setFromDate,
    endDate,
    setEndDate,
    authorityLetterNo,
    setAuthorityLetterNo,
    authorityLetterDate,
    setAuthorityLetterDate,
    pdfFile,
    setPdfFile,

    filteredRecords,
    searchState,
    setSearchState,
    letterNoOptions,

    uploadProgress,
    isUploading,

    moveEmployee,
    deleteEmployee,
    handleSubmit,
  };
};

export default useLateComer;
