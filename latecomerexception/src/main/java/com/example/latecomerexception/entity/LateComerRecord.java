package com.example.latecomerexception.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "LATE_COMER_RECORDS")
public class LateComerRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String personNo;
    private LocalDate recordDate;
    private String authorityDetails; // "AUTH_NO,AUTH_DATE"

    public LateComerRecord() {}

    public LateComerRecord(String personNo, LocalDate recordDate, String authorityDetails) {
        this.personNo = personNo;
        this.recordDate = recordDate;
        this.authorityDetails = authorityDetails;
    }

    public Long getId() { return id; }
    public String getPersonNo() { return personNo; }
    public void setPersonNo(String personNo) { this.personNo = personNo; }
    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public String getAuthorityDetails() { return authorityDetails; }
    public void setAuthorityDetails(String authorityDetails) { this.authorityDetails = authorityDetails; }
}
