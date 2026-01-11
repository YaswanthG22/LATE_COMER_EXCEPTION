// src/components/RecordsFilter/RecordsFilter.jsx
import React from "react";
import "./RecordsFilter.css";

const RecordsFilter = ({
  searchState,
  setSearchState,
  letterNoOptions = []   // ✅ DEFAULT VALUE (FIX)
}) => {
  return (
    <section className="records-filters">
      <div className="filter-row">

        {/* PERSON NO */}
        <div className="filter-item">
          <label>Person No</label>
          <input
            type="text"
            placeholder="Enter person number"
            value={searchState.personNo}
            onChange={(e) =>
              setSearchState({ ...searchState, personNo: e.target.value })
            }
          />
        </div>

        {/* DATE */}
        <div className="filter-item">
          <label>Date</label>
          <input
            type="date"
            value={searchState.date}
            onChange={(e) =>
              setSearchState({ ...searchState, date: e.target.value })
            }
          />
        </div>

        {/* LETTER NO */}
        <div className="filter-item">
          <label>Letter No</label>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Search by letter number"
              value={searchState.letterNo}
              onChange={(e) =>
                setSearchState({ ...searchState, letterNo: e.target.value })
              }
            />

            <select
              value={searchState.letterNo}
              onChange={(e) =>
                setSearchState({ ...searchState, letterNo: e.target.value })
              }
            >
              <option value="">Select letter no</option>

              {letterNoOptions.length > 0 &&
                letterNoOptions.map((ln, idx) => (
                  <option key={idx} value={ln}>
                    {ln}
                  </option>
                ))}
            </select>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RecordsFilter;
