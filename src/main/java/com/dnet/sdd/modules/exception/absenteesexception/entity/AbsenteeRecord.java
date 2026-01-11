package com.dnet.sdd.modules.exception.absenteesexception.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "ABSENTEES_EXCP", schema = "yaswanth")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AbsenteeRecord {

    @EmbeddedId
    private AbsenteeId id;

    @Column(name = "DESCP")
    private String authorityDetails;

    @Column(name = "USER_PERSNO")
    private String userPersNo;

    @Column(name = "USER_IP")
    private String userIp;

    @Column(name = "TR_DATE")
    private LocalDate trDate;
}
