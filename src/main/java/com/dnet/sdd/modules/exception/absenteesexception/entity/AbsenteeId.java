package com.dnet.sdd.modules.exception.absenteesexception.entity;

import lombok.*;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AbsenteeId implements Serializable {

    @Column(name = "PERSNO")
    private String personNo;

    @Column(name = "DT_FROM")
    private LocalDate fromDate;

    @Column(name = "DT_TO")
    private LocalDate toDate;
}
