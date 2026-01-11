package com.dnet.sdd.modules.exception.latecomerexception.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LateComerRecordId implements Serializable {

    @Column(name = "PERSNO")   // ✅ matches Oracle column
    private String personNo;

    @Column(name = "DT")       // ✅ matches Oracle column
    private LocalDate recordDate;
}
