package com.example.latecomerexception.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AUTHORITY_DOCUMENT")
public class AuthorityDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTHORITY_ID")
    private Long authorityId;

    @Column(name = "AUTHORITY_DETAILS")
    private String authorityDetails;

    @Column(name = "PDF_PATH")
    private String pdfPath;

    // ✅ --- Getters and Setters ---
    public Long getAuthorityId() {
        return authorityId;
    }

    public void setAuthorityId(Long authorityId) {
        this.authorityId = authorityId;
    }

    public String getAuthorityDetails() {
        return authorityDetails;
    }

    public void setAuthorityDetails(String authorityDetails) {
        this.authorityDetails = authorityDetails;
    }

    public String getPdfPath() {
        return pdfPath;
    }

    public void setPdfPath(String pdfPath) {
        this.pdfPath = pdfPath;
    }
}
