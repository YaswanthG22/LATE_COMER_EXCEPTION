package com.dnet.sdd.modules.exception.latecomerexception.controller;

import com.dnet.sdd.modules.exception.common.dto.SubmittedRecordDTO;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.SubmittedRecordService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
