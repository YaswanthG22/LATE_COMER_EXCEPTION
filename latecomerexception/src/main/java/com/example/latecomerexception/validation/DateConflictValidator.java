package com.example.latecomerexception.validation;

import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DateConflictValidator {

    private final LateComerRecordRepository repository;

    public void validateNoDateConflict(String personNo, LocalDate newStart, LocalDate newEnd) {

        List<LateComerRecord> existing = repository.findByIdPersonNo(personNo);

        for (LateComerRecord rec : existing) {

            LocalDate existingDate = rec.getId().getRecordDate();

            boolean conflict =
                    !existingDate.isBefore(newStart) &&
                    !existingDate.isAfter(newEnd);

            if (conflict) {
                throw new RuntimeException(
                        "Date conflict: Employee " + personNo +
                        " already has a record on " + existingDate
                );
            }
        }
    }
}
