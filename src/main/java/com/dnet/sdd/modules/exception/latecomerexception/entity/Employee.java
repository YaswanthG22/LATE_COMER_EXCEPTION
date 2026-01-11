package com.dnet.sdd.modules.exception.latecomerexception.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "EMPLOYEE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @Column(name = "PERSON_NO")
    private String personNo;   // ← Primary Key now

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESIGNATION")
    private String designation;
}
