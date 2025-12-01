import { useState, useEffect, useMemo } from "react";
import {
  getAllEmployees,
  saveLateComers,
  saveAuthority,
  getAllSubmittedRecords,
} from "../../data/api";

import { toast } from "react-toastify";

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

  /** 🔄 AUTO REFRESH SUBMITTED RECORDS EVERY 10 SECONDS */
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

  /** ============================================
   *  ✔ UPDATED handleSubmit (payload → lateComers)
   *  ============================================ 
   */
  const handleSubmit = async () => {
    if (!selectedEmployees.length) {
      toast.error("Please select at least one employee!");
      return;
    }

    if (!fromDate || !endDate) {
      toast.error("Please select a valid date range!");
      return;
    }

    const authorityDetails = `${authorityLetterNo}, ${authorityLetterDate}`;
    const insertedDate = new Date().toISOString().split("T")[0];

    // 🔥 Build LateComerRecord-like objects
    const lateComers = [];

    selectedEmployees.forEach((emp) => {
      let current = new Date(fromDate);
      const end = new Date(endDate);

      while (current <= end) {
        lateComers.push({
          personNo: emp.personNo,
          recordDate: current.toISOString().split("T")[0],
          authorityDetails: authorityDetails,
          insertedDate: insertedDate,
        });

        current.setDate(current.getDate() + 1);
      }
    });

    console.log("📌 FINAL LATE COMER OBJECT:", lateComers);

    try {
      // ⬅️ Send lateComers instead of payload
      await saveLateComers(lateComers);
      await saveAuthority(authorityDetails, pdfFile);

      toast.success("Saved successfully!");

      await loadSubmitted();
      const refreshed = await getAllEmployees();
      setAllEmployees(refreshed);

      // Reset form
      setSelectedEmployees([]);
      setFromDate("");
      setEndDate("");
      setAuthorityLetterNo("");
      setAuthorityLetterDate("");
      setPdfFile(null);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  /** LIVE SEARCH FOR SUBMITTED RECORDS */
  useEffect(() => {
    const { personNo, date, letterNo } = searchState;

    let results = submittedRecords;

    if (personNo.trim()) {
      results = results.filter((r) =>
        (r.personNo || "").toLowerCase().includes(personNo.toLowerCase())
      );
    }

    if (date.trim()) {
      results = results.filter((r) => {
        if (!r.recordDate) return false;
        const [from, to] = r.recordDate.split("→").map((s) => s.trim());
        return from <= date && date <= to;
      });
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

  /** Dropdown Options */
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
