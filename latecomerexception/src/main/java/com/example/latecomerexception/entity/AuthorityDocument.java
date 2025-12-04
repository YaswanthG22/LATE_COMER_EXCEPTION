package com.example.latecomerexception.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AUTHORITY_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorityDocument {

    @Id
    @Column(name = "AUTHORITY_DETAILS")
    private String authorityDetails;   // ← Primary Key now

    @Column(name = "PDF_PATH")
    private String pdfPath;
}
