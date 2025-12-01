package com.example.latecomerexception.service;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LateComerRecordService {

    private final LateComerRecordRepository repository;

    // ✔ NEW METHOD (matches controller)
    public void saveLateComers(List<LateComerRecordRequest> requests) {

        List<LateComerRecord> records = requests.stream()
                .map(req -> new LateComerRecord(
                        req.getPersonNo(),
                        req.getRecordDate(),
                        req.getAuthorityDetails(),
                        req.getInsertedDate()
                ))
                .collect(Collectors.toList());

        repository.saveAll(records);

        System.out.println("Saved " + records.size() + " late comer records");
    }
}
