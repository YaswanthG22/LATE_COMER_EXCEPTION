package com.dnet.sdd.modules.exception.latecomerexception.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;


import lombok.RequiredArgsConstructor;

import com.dnet.sdd.modules.exception.latecomerexception.dto.LateComerRecordRequest;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.LateComerSubmissionService;

@RestController
@RequestMapping("/api/latecomer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LateComerRecordController {

    private final LateComerSubmissionService submissionService;

    @PostMapping(value = "/full-submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> submitFull(
            @RequestPart("records") List<LateComerRecordRequest> records,
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestPart("pdfFile") MultipartFile pdfFile
    ) {
        submissionService.submitAll(records, authorityDetails, pdfFile);
        return ResponseEntity.ok().build();
    }
}
