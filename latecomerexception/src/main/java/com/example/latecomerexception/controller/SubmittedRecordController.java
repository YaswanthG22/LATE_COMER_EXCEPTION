package com.example.latecomerexception.controller;

import com.example.latecomerexception.dto.SubmittedRecordDTO;
import com.example.latecomerexception.service.SubmittedRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/submitted-records")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SubmittedRecordController {

    private final SubmittedRecordService service;

    @GetMapping("/all")
    public ResponseEntity<List<SubmittedRecordDTO>> getAllRecords() {
        return ResponseEntity.ok(service.getAllRecords());
    }
}
