package com.example.latecomerexception.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "LATE_COMER_RECORDS", schema = "EMPLOYEE_USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LateComerRecord {

    @EmbeddedId
    private LateComerRecordId id;   // ✅ Composite key

    @Column(name = "DESCP")         // ✅ matches Oracle column
    private String authorityDetails;

    @Column(name = "INSERTED_DATE") // ✅ matches Oracle column
    private LocalDate insertedDate;

    // Convenience constructor for service
    public LateComerRecord(String personNo, LocalDate recordDate,
                           String authorityDetails, LocalDate insertedDate) {

        this.id = new LateComerRecordId(personNo, recordDate);
        this.authorityDetails = authorityDetails;
        this.insertedDate = insertedDate;
    }
}
