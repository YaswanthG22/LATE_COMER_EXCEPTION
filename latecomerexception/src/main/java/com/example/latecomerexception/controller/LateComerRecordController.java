package com.example.latecomerexception.controller;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import com.example.latecomerexception.service.api.LateComerSubmissionService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/latecomer")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class LateComerRecordController {

    private final LateComerSubmissionService submissionService;

    /**
     * ✅ NEW ENDPOINT
     * Atomic submit:
     * - Save PDF file
     * - Validate dates
     * - Save Authority Document
     * - Save Late Comer Records
     * ALL in a single @Transactional service call.
     */
    @PostMapping(
        value = "/full-submit",
        consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }
    )
    public ResponseEntity<?> fullSubmit(
            @RequestPart("lateComers") List<LateComerRecordRequest> lateComers,
            @RequestPart("authorityDetails") String authorityDetails,
            @RequestPart("pdfFile") MultipartFile pdfFile
    ) {
        submissionService.submitAll(lateComers, authorityDetails, pdfFile);
        return ResponseEntity.ok("All saved successfully!");
    }



    // ❌ OLD ENDPOINT (your previous version)
    // You no longer need this. UI won't call this anymore.
    // Keeping it commented in case you want it for reference.

    /*
    @PostMapping("/save")
    public ResponseEntity<?> saveLateComers(
            @RequestBody List<LateComerRecordRequest> requests,
            @RequestParam("pdfPath") String pdfPath
    ) {
        File uploadedFile = new File(pdfPath);
        try {
            service.saveLateComers(requests);
            return ResponseEntity.ok("Late Comer Records saved successfully!");
        } catch (Exception e) {
            if (uploadedFile.exists()) uploadedFile.delete();
            return ResponseEntity.internalServerError()
                    .body("Error: " + e.getMessage());
        }
    }
    */
}
