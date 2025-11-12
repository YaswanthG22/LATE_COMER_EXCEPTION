package com.example.latecomerexception.dto;

public class SubmittedRecordDTO {
    private Long id;
    private String personNo;
    private String recordDate;
    private String authorityDetails;
    private String pdfSource; // ✅ must exist

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPersonNo() { return personNo; }
    public void setPersonNo(String personNo) { this.personNo = personNo; }

    public String getRecordDate() { return recordDate; }
    public void setRecordDate(String recordDate) { this.recordDate = recordDate; }

    public String getAuthorityDetails() { return authorityDetails; }
    public void setAuthorityDetails(String authorityDetails) { this.authorityDetails = authorityDetails; }

    public String getPdfSource() { return pdfSource; }
    public void setPdfSource(String pdfSource) { this.pdfSource = pdfSource; }
}
