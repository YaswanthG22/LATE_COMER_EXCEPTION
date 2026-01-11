import { useState, useEffect, useMemo } from "react";

import {
  getAllEmployees,
  getAllSubmittedRecords,
  submitLateEarlyOut,
} from "../api";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const useLateEarlyOut = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorityLetterNo, setAuthorityLetterNo] = useState("");
  const [authorityLetterDate, setAuthorityLetterDate] = useState("");

  const [pdfFile, setPdfFile] = useState(null);

  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [searchState, setSearchState] = useState({
    personNo: "",
    date: "",
    letterNo: "",
  });

  // ================= LOADERS =================
  const loadEmployees = async () => {
    const data = await getAllEmployees();
    setAllEmployees(data || []);
  };

  const loadSubmitted = async () => {
    const data = await getAllSubmittedRecords();
    setSubmittedRecords(data || []);
    setFilteredRecords(data || []);
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadEmployees();
    loadSubmitted();
  }, []);

  // ================= AUTO REFRESH =================
  useEffect(() => {
    const interval = setInterval(() => {
      loadSubmitted();
      if (selectedEmployees.length === 0) {
        loadEmployees();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedEmployees]);

  // ================= EMPLOYEE MOVE =================
  const moveEmployee = (emp) => {
    setSelectedEmployees((prev) => [...prev, emp]);
    setAllEmployees((prev) =>
      prev.filter((e) => e.personNo !== emp.personNo)
    );
  };

  const deleteEmployee = (personNo) => {
    const emp = selectedEmployees.find((e) => e.personNo === personNo);

    setSelectedEmployees((prev) =>
      prev.filter((e) => e.personNo !== personNo)
    );

    if (emp) {
      setAllEmployees((prev) => [...prev, emp]);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (!selectedEmployees.length)
        return toast.error("Select at least one employee!");

      if (!fromDate || !endDate)
        return toast.error("Select a valid date range!");

      if (!authorityLetterNo || !authorityLetterDate)
        return toast.error("Enter authority letter details!");

      if (!pdfFile)
        return toast.error("Please attach the PDF!");

      const authorityDetails = `${authorityLetterNo}, ${authorityLetterDate}`;
      const trDate = new Date().toISOString().split("T")[0];

      const records = selectedEmployees.map((emp) => ({
        personNo: emp.personNo,
        fromDate,
        toDate: endDate,
        authorityDetails,
        userPersNo: "890071",
        userIp: "frontend",
        trDate,
      }));

      const formData = new FormData();
      formData.append("records", JSON.stringify(records));
      formData.append("pdfFile", pdfFile);

      await submitLateEarlyOut(formData);

      // ================= RESET =================
      setSelectedEmployees([]);
      setFromDate("");
      setEndDate("");
      setAuthorityLetterNo("");
      setAuthorityLetterDate("");
      setPdfFile(null);

      await loadEmployees();
      await loadSubmitted();

      toast.success("LateEarlyOut records submitted successfully!");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          typeof err?.response?.data === "string"
            ? err.response.data
            : err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // ================= FILTERS =================
  useEffect(() => {
    let data = [...submittedRecords];

    if (searchState.personNo) {
      data = data.filter((r) =>
        r.personNo?.toLowerCase().includes(searchState.personNo.toLowerCase())
      );
    }

    if (searchState.date) {
      data = data.filter(
        (r) =>
          r.fromDate?.includes(searchState.date) ||
          r.toDate?.includes(searchState.date)
      );
    }

    if (searchState.letterNo) {
      data = data.filter((r) =>
        r.authorityDetails
          ?.toLowerCase()
          .includes(searchState.letterNo.toLowerCase())
      );
    }

    setFilteredRecords(data);
  }, [searchState, submittedRecords]);

  const letterNoOptions = useMemo(() => {
    return [
      ...new Set(
        submittedRecords.map(
          (r) => r.authorityDetails?.split(",")[0].trim()
        )
      ),
    ].filter(Boolean);
  }, [submittedRecords]);

  return {
    allEmployees,
    selectedEmployees,
    moveEmployee,
    deleteEmployee,

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

    handleSubmit,
  };
};

export default useLateEarlyOut;
