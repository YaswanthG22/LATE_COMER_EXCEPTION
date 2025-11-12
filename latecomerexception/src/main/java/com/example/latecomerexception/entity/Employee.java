package com.example.latecomerexception.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "EMPLOYEE") // Match your exact Oracle table name
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "PERSON_NO")
    private String personNo;

    @Column(name = "DESIGNATION")
    private String designation;

    // ✅ Default constructor (required by JPA)
    public Employee() {}

    // ✅ Parameterized constructor (optional for convenience)
    public Employee(String name, String personNo, String designation) {
        this.name = name;
        this.personNo = personNo;
        this.designation = designation;
    }

    // ✅ Public Getters (required for JSON serialization)
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPersonNo() {
        return personNo;
    }

    public String getDesignation() {
        return designation;
    }

    // ✅ Public Setters (used during deserialization or manually)
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPersonNo(String personNo) {
        this.personNo = personNo;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
