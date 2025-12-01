package com.example.latecomerexception.dto;

import java.time.LocalDate;

public class SubmittedRecordDTO {

    private String personNo;
    private String recordDate;
    private String authorityDetails;
    private String pdfSource;

    // Hidden field used only for sorting (not sent to frontend)
    private LocalDate sortDate;

    // -------------------- GETTERS & SETTERS --------------------

    public String getPersonNo() {
        return personNo;
    }
    public void setPersonNo(String personNo) {
        this.personNo = personNo;
    }

    public String getRecordDate() {
        return recordDate;
    }
    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    public String getAuthorityDetails() {
        return authorityDetails;
    }
    public void setAuthorityDetails(String authorityDetails) {
        this.authorityDetails = authorityDetails;
    }

    public String getPdfSource() {
        return pdfSource;
    }
    public void setPdfSource(String pdfSource) {
        this.pdfSource = pdfSource;
    }

    public LocalDate getSortDate() {
        return sortDate;
    }
    public void setSortDate(LocalDate sortDate) {
        this.sortDate = sortDate;
    }
}
