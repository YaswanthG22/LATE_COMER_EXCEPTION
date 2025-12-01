package com.example.latecomerexception.controller;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.service.AuthorityDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/authority")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor // ✅ Lombok auto-creates constructor
public class AuthorityDocumentController {

    private final AuthorityDocumentService service;
    private final AuthorityDocumentRepository authorityDocumentRepository;

    // 1️⃣ Upload file
    @PostMapping("/save")
    public ResponseEntity<String> saveAuthority(
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestParam("pdfFile") MultipartFile pdfFile
    ) {
        try {
            String uploadDir = "A:/DRDL DIT/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            String filePath = uploadDir + pdfFile.getOriginalFilename();
            pdfFile.transferTo(new File(filePath));

            AuthorityDocument doc = AuthorityDocument.builder()
                    .authorityDetails(authorityDetails)
                    .pdfPath(filePath)
                    .build();

            authorityDocumentRepository.save(doc);

            return ResponseEntity.ok("File uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error saving file: " + e.getMessage());
        }
    }

    // 2️⃣ Fetch all
    @GetMapping("/all")
    public ResponseEntity<List<AuthorityDocument>> getAll() {
        return ResponseEntity.ok(authorityDocumentRepository.findAll());
    }

    // 3️⃣ Update record
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAuthority(
            @PathVariable Long id,
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile
    ) {
        try {
            AuthorityDocument doc = authorityDocumentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Document not found"));

            doc.setAuthorityDetails(authorityDetails);

            if (pdfFile != null && !pdfFile.isEmpty()) {
                String uploadDir = "A:/DRDL DIT/uploads/";
                File directory = new File(uploadDir);
                if (!directory.exists()) directory.mkdirs();

                String filePath = uploadDir + pdfFile.getOriginalFilename();
                pdfFile.transferTo(new File(filePath));

                doc.setPdfPath(filePath);
            }

            authorityDocumentRepository.save(doc);
            return ResponseEntity.ok("Record updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error updating record: " + e.getMessage());
        }
    }

    // 4️⃣ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            authorityDocumentRepository.deleteById(id);
            return ResponseEntity.ok("Record deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error deleting record: " + e.getMessage());
        }
    }

    // 5️⃣ Test endpoint
    @GetMapping("/test")
    public String test() {
        return "Authority Document API is working!";
    }
}
