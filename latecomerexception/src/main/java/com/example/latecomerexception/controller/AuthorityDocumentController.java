package com.example.latecomerexception.controller;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.service.AuthorityDocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/authority")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to connect
public class AuthorityDocumentController {

    private final AuthorityDocumentService service;
    private final AuthorityDocumentRepository authorityDocumentRepository;

    public AuthorityDocumentController(AuthorityDocumentService service,
                                       AuthorityDocumentRepository authorityDocumentRepository) {
        this.service = service;
        this.authorityDocumentRepository = authorityDocumentRepository;
    }

    // ✅ 1️⃣ Upload a new record (original filename preserved)
    @PostMapping("/save")
    public ResponseEntity<String> saveAuthority(
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestParam("pdfFile") MultipartFile pdfFile
    ) {
        try {
            String uploadDir = "A:/DRDL DIT/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            // Save file using original filename
            String originalFilename = pdfFile.getOriginalFilename();
            String filePath = uploadDir + originalFilename;
            pdfFile.transferTo(new File(filePath));

            // Save record in DB
            AuthorityDocument doc = new AuthorityDocument();
            doc.setAuthorityDetails(authorityDetails);
            doc.setPdfPath(filePath);

            authorityDocumentRepository.save(doc);

            return ResponseEntity.ok("✅ File uploaded successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error saving file: " + e.getMessage());
        }
    }

    // ✅ 2️⃣ Get all uploaded records (for frontend display)
    @GetMapping("/all")
    public ResponseEntity<List<AuthorityDocument>> getAll() {
        return ResponseEntity.ok(authorityDocumentRepository.findAll());
    }

    // ✅ 3️⃣ Update an existing record (edit details or replace PDF)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAuthority(
            @PathVariable Long id,
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile
    ) {
        try {
            AuthorityDocument doc = authorityDocumentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Document not found"));

            // Update text details
            doc.setAuthorityDetails(authorityDetails);

            // If a new PDF is uploaded, replace the existing file
            if (pdfFile != null && !pdfFile.isEmpty()) {
                String uploadDir = "A:/DRDL DIT/uploads/";
                File directory = new File(uploadDir);
                if (!directory.exists()) directory.mkdirs();

                String filePath = uploadDir + pdfFile.getOriginalFilename();
                pdfFile.transferTo(new File(filePath));

                doc.setPdfPath(filePath);
            }

            authorityDocumentRepository.save(doc);
            return ResponseEntity.ok("✅ Record updated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error updating record: " + e.getMessage());
        }
    }

    // ✅ 4️⃣ Delete record
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            authorityDocumentRepository.deleteById(id);
            return ResponseEntity.ok("🗑️ Record deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error deleting record: " + e.getMessage());
        }
    }

    // ✅ 5️⃣ Simple test endpoint
    @GetMapping("/test")
    public String test() {
        return "✅ Authority Document API is working!";
    }
}
