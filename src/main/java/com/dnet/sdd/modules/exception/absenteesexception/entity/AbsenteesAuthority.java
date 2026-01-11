package com.dnet.sdd.modules.exception.absenteesexception.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AUTHORITY_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AbsenteesAuthority {

    @Id
    @Column(name = "AUTHORITY_DETAILS")
    private String authorityDetails;

    @Column(name = "PDF_PATH")
    private String pdfPath;

    @Column(name = "MODULE_TYPE")
    private String moduleType;
}
