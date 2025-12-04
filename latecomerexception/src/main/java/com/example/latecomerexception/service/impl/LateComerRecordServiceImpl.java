package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.entity.LateComerRecordId;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import com.example.latecomerexception.service.api.LateComerRecordService;
import com.example.latecomerexception.validation.DateConflictValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LateComerRecordServiceImpl implements LateComerRecordService {

    private final LateComerRecordRepository repository;
    private final DateConflictValidator validator;

    @Override
    public void saveLateComers(List<LateComerRecordRequest> requests) {

        validateRequests(requests);

        List<LateComerRecord> records = mapToEntities(requests);

        repository.saveAll(records);
    }

    private void validateRequests(List<LateComerRecordRequest> requests) {
        for (LateComerRecordRequest req : requests) {
            LocalDate date = req.getRecordDate();
            validator.validateNoDateConflict(req.getPersonNo(), date, date);
        }
    }

    private List<LateComerRecord> mapToEntities(List<LateComerRecordRequest> requests) {
        return requests.stream()
                .map(req -> new LateComerRecord(
                        new LateComerRecordId(req.getPersonNo(), req.getRecordDate()),
                        req.getAuthorityDetails(),
                        req.getInsertedDate()
                ))
                .collect(Collectors.toList());
    }
}
