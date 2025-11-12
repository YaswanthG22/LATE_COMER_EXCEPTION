package com.example.latecomerexception.controller;

import com.example.latecomerexception.dto.SubmittedRecordDTO;
import com.example.latecomerexception.service.SubmittedRecordService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/submitted-records")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmittedRecordController {

    private final SubmittedRecordService service;

    public SubmittedRecordController(SubmittedRecordService service) {
        this.service = service;
    }

    // ✅ Fixes your 404 - this endpoint will now respond to the React call
    @GetMapping("/all")
    public ResponseEntity<List<SubmittedRecordDTO>> getAllRecords() {
        return ResponseEntity.ok(service.getAllRecords());
    }
}
