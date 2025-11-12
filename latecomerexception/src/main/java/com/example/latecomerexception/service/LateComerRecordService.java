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

    /**
     * ✅ Saves late-comer records for all selected employees between given date range.
     * Called by the controller when React frontend sends data.
     */
    public void saveLateComers(List<String> employeeNos, LocalDate fromDate, LocalDate endDate, String authorityDetails) {
        List<LateComerRecord> allRecords = new ArrayList<>();

        // Loop through each employee and create one record per day
        for (String personNo : employeeNos) {
            for (LocalDate d = fromDate; !d.isAfter(endDate); d = d.plusDays(1)) {
                LateComerRecord record = new LateComerRecord(personNo, d, authorityDetails);
                allRecords.add(record);
            }
        }

        // ✅ Persist all records to DB at once
        repository.saveAll(allRecords);

        System.out.println("✅ Saved " + allRecords.size() + " records successfully into the database!");
    }
}
