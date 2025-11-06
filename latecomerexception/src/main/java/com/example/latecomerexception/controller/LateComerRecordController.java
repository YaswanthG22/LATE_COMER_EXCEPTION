package com.example.latecomerexception.controller;

import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/latecomer")
@CrossOrigin(origins = "http://localhost:3000")
public class LateComerRecordController {

    @Autowired
    private LateComerRecordRepository lateComerRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveLateComers(@RequestBody Map<String, Object> payload) {
        System.out.println("📦 Received payload: " + payload); // ✅ Debug log

        List<String> employees = (List<String>) payload.get("employees");
        String fromDateStr = (String) payload.get("fromDate");
        String endDateStr = (String) payload.get("endDate");
        String authorityDetails = (String) payload.get("authorityDetails");

        if (employees == null || employees.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ No employees provided");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fromDate = LocalDate.parse(fromDateStr, formatter);
        LocalDate endDate = LocalDate.parse(endDateStr, formatter);

        for (String empNo : employees) {
            LocalDate currentDate = fromDate;
            while (!currentDate.isAfter(endDate)) {
                LateComerRecord record = new LateComerRecord();
                record.setPersonNo(empNo);
                record.setRecordDate(currentDate);
                record.setAuthorityDetails(authorityDetails);
                lateComerRepository.save(record);
                currentDate = currentDate.plusDays(1);
            }
        }

        return ResponseEntity.ok("✅ Saved successfully!");
    }
}
