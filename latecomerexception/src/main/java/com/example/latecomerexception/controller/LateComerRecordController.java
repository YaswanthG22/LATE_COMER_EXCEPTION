package com.example.latecomerexception.controller;

import com.example.latecomerexception.service.LateComerRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/latecomer")
@CrossOrigin(origins = "http://localhost:3000")
public class LateComerRecordController {

    private final LateComerRecordService service;

    public LateComerRecordController(LateComerRecordService service) {
        this.service = service;
    }

    /**
     * ✅ API endpoint: POST /api/latecomer/save
     * Expected JSON payload:
     * {
     *   "employees": ["P111", "P222"],
     *   "fromDate": "2025-11-10",
     *   "endDate": "2025-11-13",
     *   "authorityDetails": "AUTH123, 2025-11-12"
     * }
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveLateComers(@RequestBody Map<String, Object> payload) {
        try {
            List<String> employees = (List<String>) payload.get("employees");
            LocalDate fromDate = LocalDate.parse(payload.get("fromDate").toString());
            LocalDate endDate = LocalDate.parse(payload.get("endDate").toString());
            String authorityDetails = payload.get("authorityDetails").toString();

            service.saveLateComers(employees, fromDate, endDate, authorityDetails);
            return ResponseEntity.ok("✅ Data saved successfully to database!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("❌ Failed to save data: " + e.getMessage());
        }
    }
}
