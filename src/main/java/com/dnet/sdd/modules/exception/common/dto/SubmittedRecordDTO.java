package com.dnet.sdd.modules.exception.common.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class SubmittedRecordDTO {

    private String personNo;
    private String recordDate;        // date or date range (String)
    private String authorityDetails;
    private String pdfSource;
    private LocalDate sortDate;       // internal use only

    // ✅ ADDED CONSTRUCTOR (BACKWARD-COMPATIBLE)
    public SubmittedRecordDTO(
            String personNo,
            String recordDate,
            String authorityDetails,
            String pdfSource
    ) {
        this.personNo = personNo;
        this.recordDate = recordDate;
        this.authorityDetails = authorityDetails;
        this.pdfSource = pdfSource;
    }
}
