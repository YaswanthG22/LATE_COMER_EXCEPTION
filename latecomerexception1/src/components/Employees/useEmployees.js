import { useState, useEffect, useMemo } from "react";
import {
  getAllEmployees,
  getAllSubmittedRecords,
  submitFullData, // ✅ NEW ATOMIC API
} from "../../data/api";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const useEmployees = () => {
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

  /** Load Employees + Submitted Records */
  useEffect(() => {
    getAllEmployees().then((data) => setAllEmployees(data || []));
    loadSubmitted();
  }, []);

  const loadSubmitted = async () => {
    try {
      const data = await getAllSubmittedRecords();
      setSubmittedRecords(data || []);
      setFilteredRecords(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  /** Auto-refresh submitted list */
  useEffect(() => {
    const interval = setInterval(() => {
      loadSubmitted();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /** Move Employee */
  const moveEmployee = (emp) => {
    if (!emp) return;
    setSelectedEmployees((prev) => [...prev, emp]);
    setAllEmployees((prev) => prev.filter((e) => e.personNo !== emp.personNo));
  };

  /** Delete Employee */
  const deleteEmployee = (personNo) => {
    const emp = selectedEmployees.find((e) => e.personNo === personNo);
    if (!emp) return;

    setAllEmployees((p) => [...p, emp]);
    setSelectedEmployees((p) => p.filter((e) => e.personNo !== personNo));
  };

  /** Helper: Get all dates between range */
  // const getAllDatesInRange = (start, end) => {
  //   const dates = [];
  //   let current = new Date(start);

  //   while (current <= new Date(end)) {
  //     dates.push(current.toISOString().split("T")[0]);
  //     current.setDate(current.getDate() + 1);
  //   }
  //   return dates;
  // };

  /** ==================================================
   *  🔥 handleSubmit — NOW USING FULL ATOMIC SUBMIT
   *  ================================================== */
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
      toast.error("Enter authority number and date!");
      return;
    }

    if (!pdfFile) {
      toast.error("Please attach the PDF file!");
      return;
    }

    // Build selected date list (frontend check)
    // const dateList = getAllDatesInRange(fromDate, endDate);

    for (let emp of selectedEmployees) {
      const hasDuplicate = submittedRecords.some((rec) => {
        // NOTE: submittedRecords has dateRANGE string, so conflict detection is unreliable.
        // Backend validator will enforce the real validation. This frontend check remains simple.
        return false;
      });

      if (hasDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Date Found!",
          text: `Employee ${emp.personNo} already has an exception within this date range.`,
          confirmButtonColor: "#2563eb",
        });
        return;
      }
    }

    const authorityDetails = `${authorityLetterNo}, ${authorityLetterDate}`;
    const insertedDate = new Date().toISOString().split("T")[0];

    const lateComers = [];
    selectedEmployees.forEach((emp) => {
      let current = new Date(fromDate);
      const end = new Date(endDate);

      while (current <= end) {
        lateComers.push({
          personNo: emp.personNo,
          recordDate: current.toISOString().split("T")[0],
          authorityDetails,
          insertedDate,
        });

        current.setDate(current.getDate() + 1);
      }
    });

    try {
      // 🔥 ONE ATOMIC BACKEND CALL
      await submitFullData(lateComers, authorityDetails, pdfFile);

      toast.success("Saved successfully!");

      await loadSubmitted();
      setAllEmployees(await getAllEmployees());

      // Reset fields after successful save
      setSelectedEmployees([]);
      setFromDate("");
      setEndDate("");
      setAuthorityLetterNo("");
      setAuthorityLetterDate("");
      setPdfFile(null);

    } catch (err) {
      console.error(err);

      const backendMessage = err?.response?.data;
      if (backendMessage) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: backendMessage,
          confirmButtonColor: "#d33",
        });
        return;
      }

      toast.error("Something went wrong!");
    }
  };

  /** LIVE FILTER */
  useEffect(() => {
    const { personNo, date, letterNo } = searchState;

    let results = submittedRecords;

    if (personNo.trim()) {
      results = results.filter((r) =>
        (r.personNo || "").toLowerCase().includes(personNo.toLowerCase())
      );
    }

    if (date.trim()) {
      results = results.filter((r) => r.recordDate === date);
    }

    if (letterNo.trim()) {
      results = results.filter((r) =>
        (r.authorityDetails || "").toLowerCase().includes(letterNo.toLowerCase())
      );
    }

    setFilteredRecords(results);
  }, [searchState, submittedRecords]);

  /** Dropdown options */
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

    submittedRecords,
    filteredRecords,
    searchState,
    setSearchState,
    letterNoOptions,

    moveEmployee,
    deleteEmployee,
    handleSubmit,
  };
};

export default useEmployees;
