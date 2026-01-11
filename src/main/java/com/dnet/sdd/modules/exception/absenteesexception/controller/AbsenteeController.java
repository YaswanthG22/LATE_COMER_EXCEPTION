package com.dnet.sdd.modules.exception.absenteesexception.controller;

import java.time.LocalDate;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.RequiredArgsConstructor;

import com.dnet.sdd.modules.exception.absenteesexception.dto.AbsenteeRequest;
import com.dnet.sdd.modules.exception.absenteesexception.service.api.AbsenteeSubmissionService;
import com.dnet.sdd.modules.exception.absenteesexception.service.api.AbsenteeService;

@RestController
@RequestMapping("/api/absentees")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AbsenteeController {

    private final AbsenteeSubmissionService submissionService;
    private final AbsenteeService viewService;

    @PostMapping(
        value = "/submit-multi",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> submitMulti(
            @RequestPart("records") String recordsJson,
            @RequestPart(value = "pdfFile", required = false) MultipartFile pdfFile,
            HttpServletRequest request
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

        List<AbsenteeRequest> records =
                mapper.readValue(
                        recordsJson,
                        new TypeReference<List<AbsenteeRequest>>() {}
                );

        String userIp = request.getRemoteAddr();
        LocalDate trDate = LocalDate.now();

        records.forEach(r -> {
            r.setUserPersNo("890071");
            r.setUserIp(userIp);
            r.setTrDate(trDate);
        });

        // 🚨 If duplicate → ApiException → GlobalExceptionHandler
        submissionService.submitAll(records, pdfFile);

        return ResponseEntity.ok("Absentee records saved successfully");
    }

    @GetMapping("/submitted-records")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(viewService.getAll());
    }
}
