package com.example.latecomerexception.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LateComerRecordRequest {
    private String personNo;
    private LocalDate recordDate;
    private String authorityDetails;
    private LocalDate insertedDate;
}
