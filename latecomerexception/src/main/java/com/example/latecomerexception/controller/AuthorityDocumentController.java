package com.example.latecomerexception.controller;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.service.AuthorityDocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/authority")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorityDocumentController {

    private final AuthorityDocumentService service;
    private final AuthorityDocumentRepository authorityDocumentRepository;

    public AuthorityDocumentController(AuthorityDocumentService service,
                                       AuthorityDocumentRepository authorityDocumentRepository) {
        this.service = service;
        this.authorityDocumentRepository = authorityDocumentRepository;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveAuthority(
            @RequestParam("authorityDetails") String authorityDetails,
            @RequestParam("pdfFile") MultipartFile pdfFile,
            @RequestParam("employees") List<String> employees
    ) {
        try {
            // ✅ Ensure upload directory exists
            String uploadDir = "A:/DRDL DIT/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // ✅ Read uploaded file bytes once
            byte[] fileBytes = pdfFile.getBytes();

            // ✅ Use timestamp to ensure uniqueness across all employees
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

            for (String empNo : employees) {
                // ✅ Create a clean unique filename
                String baseName = pdfFile.getOriginalFilename();
                String uniqueFileName = empNo + "_" + timestamp + "_" + baseName;
                String filePath = uploadDir + uniqueFileName;

                // ✅ Write bytes safely to disk
                try (OutputStream out = new FileOutputStream(filePath)) {
                    FileCopyUtils.copy(fileBytes, out);
                }

                // ✅ Save metadata in DB
                AuthorityDocument doc = new AuthorityDocument();
                doc.setAuthorityDetails(authorityDetails);
                doc.setPdfSource(filePath);
                authorityDocumentRepository.save(doc);
            }

            return ResponseEntity.ok("✅ Files saved successfully for all employees!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("❌ Error saving files: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<AuthorityDocument>> getAll() {
        return ResponseEntity.ok(service.getAllDocuments());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test")
    public String test() {
        return "✅ Authority Document API is working!";
    }
}
