package com.dnet.sdd.modules.exception.latecomerexception.dto;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LateComerRecordRequest {

    private String personNo;
    private LocalDate recordDate;
}
