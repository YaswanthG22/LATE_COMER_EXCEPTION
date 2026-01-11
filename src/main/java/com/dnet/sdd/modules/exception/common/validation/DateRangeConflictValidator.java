package com.dnet.sdd.modules.exception.common.validation;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.dnet.sdd.modules.exception.latecomerexception.exception.ApiException;

@Component
public class DateRangeConflictValidator {

    public <T> void validateNoOverlap(
            String personNo,
            LocalDate from,
            LocalDate to,
            List<T> existingRecords,
            DateRangeExtractor<T> extractor,
            String moduleName
    ) {

        for (T record : existingRecords) {

            if (!personNo.equals(extractor.getPersonNo(record))) {
                continue;
            }

            LocalDate existingFrom = extractor.getFromDate(record);
            LocalDate existingTo   = extractor.getToDate(record);

            // overlap condition
            if (!to.isBefore(existingFrom) && !from.isAfter(existingTo)) {
                throw new ApiException(
                        moduleName + " record already exists for person "
                                + personNo + " between "
                                + existingFrom + " and " + existingTo,
                        HttpStatus.CONFLICT
                );
            }
        }
    }
}
