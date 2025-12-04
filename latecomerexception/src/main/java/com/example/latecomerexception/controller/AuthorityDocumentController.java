package com.example.latecomerexception.controller;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.service.api.AuthorityDocumentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authority")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthorityDocumentController {

    private final AuthorityDocumentService service;
    private final AuthorityDocumentRepository authorityDocumentRepository;

    // ❌ REMOVED: /save endpoint that was writing files immediately

    // 1️⃣ Fetch all records
    @GetMapping("/all")
    public ResponseEntity<List<AuthorityDocument>> getAll() {
        return ResponseEntity.ok(authorityDocumentRepository.findAll());
    }

    // 2️⃣ Update only the text field — no file uploading here anymore
    @PutMapping("/update/{id}")
    @Transactional
    public ResponseEntity<String> updateAuthority(
            @PathVariable String id,
            @RequestParam("authorityDetails") String authorityDetails
    ) {
        try {
            AuthorityDocument doc = authorityDocumentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Document not found"));

            doc.setAuthorityDetails(authorityDetails);
            authorityDocumentRepository.save(doc);

            return ResponseEntity.ok("Record updated successfully!");

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error updating record: " + e.getMessage());
        }
    }

    // 3️⃣ Delete authority record
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable String id) {
        try {
            authorityDocumentRepository.deleteById(id);
            return ResponseEntity.ok("Record deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error deleting record: " + e.getMessage());
        }
    }

    // 4️⃣ Test endpoint
    @GetMapping("/test")
    public String test() {
        return "Authority Document API is working!";
    }
}
