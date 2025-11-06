package com.example.latecomerexception.service;

import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class LateComerRecordService {
    private final LateComerRecordRepository repository;

    public LateComerRecordService(LateComerRecordRepository repository) {
        this.repository = repository;
    }

    public List<LateComerRecord> saveRange(String personNo, LocalDate fromDate, LocalDate endDate, String authorityDetails) {
        List<LateComerRecord> batch = new ArrayList<>();
        for (LocalDate d = fromDate; !d.isAfter(endDate); d = d.plusDays(1)) {
            batch.add(new LateComerRecord(personNo, d, authorityDetails));
        }
        return repository.saveAll(batch);
    }
}
