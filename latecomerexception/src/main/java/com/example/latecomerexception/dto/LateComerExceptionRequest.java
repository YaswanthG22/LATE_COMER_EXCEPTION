package com.example.latecomerexception.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LateComerExceptionRequest {

    private List<String> employees;
    private LocalDate fromDate;
    private LocalDate endDate;
    private String authorityDetails;
}
