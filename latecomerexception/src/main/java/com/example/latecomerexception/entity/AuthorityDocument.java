package com.example.latecomerexception.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AUTHORITY_DOCUMENT")
public class AuthorityDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AUTHORITY_DETAILS")
    private String authorityDetails;

    @Column(name = "PDF_PATH")
    private String pdfSource;  // ✅ Field name used in DB and Java

    // --- Constructors ---
    public AuthorityDocument() {}

    public AuthorityDocument(String authorityDetails, String pdfSource) {
        this.authorityDetails = authorityDetails;
        this.pdfSource = pdfSource;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
