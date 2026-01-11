import React from "react";

import EmployeeTable from "../../../components/EmployeeTable/EmployeeTable";
import Controls from "../../../components/Controls/Controls";
import RecordsFilter from "../../../components/RecordsFilter/RecordsFilter";
import SubmittedRecords from "../../../components/SubmittedRecords/SubmittedRecords";

import useLateComer from "../hooks/useLateComer";

const LateComerPage = () => {
  const vm = useLateComer();

  return (
    <div className="empdash">
      <div className="container-fluid px-3">
        <h1 className="text-center mb-4 text-primary">
          Late Comer Exception
        </h1>

        <div className="row gx-3 mb-4">
          <div className="col-md-6">
            <EmployeeTable
              title="Selected Employees"
              data={vm.selectedEmployees}
              onDelete={vm.deleteEmployee}
            />
          </div>

          <div className="col-md-6">
            <EmployeeTable
              title="All Employees"
              data={vm.allEmployees}
              onMove={vm.moveEmployee}
            />
          </div>
        </div>

        <Controls
          fromDate={vm.fromDate}
          setFromDate={vm.setFromDate}
          endDate={vm.endDate}
          setEndDate={vm.setEndDate}
          authorityLetterNo={vm.authorityLetterNo}
          setAuthorityLetterNo={vm.setAuthorityLetterNo}
          authorityLetterDate={vm.authorityLetterDate}
          setAuthorityLetterDate={vm.setAuthorityLetterDate}
          pdfFile={vm.pdfFile}
          setPdfFile={vm.setPdfFile}
          selectedEmployees={vm.selectedEmployees}
          onSubmit={vm.handleSubmit}
        />

        <RecordsFilter
          searchState={vm.searchState}
          setSearchState={vm.setSearchState}
          letterNoOptions={vm.letterNoOptions}
        />

        <SubmittedRecords records={vm.filteredRecords} />
      </div>
    </div>
  );
};

export default LateComerPage;
