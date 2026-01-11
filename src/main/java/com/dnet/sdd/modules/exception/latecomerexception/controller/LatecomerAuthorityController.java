package com.dnet.sdd.modules.exception.latecomerexception.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.dnet.sdd.modules.exception.latecomerexception.entity.LatecomerAuthority;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.LatecomerAuthorityService;

@RestController
@RequestMapping("/api/latecomer/authority")
@RequiredArgsConstructor
public class LatecomerAuthorityController {

    private final LatecomerAuthorityService authorityService;

    @PostMapping("/save")
    public ResponseEntity<LatecomerAuthority> save(
            @RequestParam String authorityDetails,
            @RequestParam MultipartFile pdfFile
    ) {
        return ResponseEntity.ok(
                authorityService.saveAuthority(authorityDetails, pdfFile)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<LatecomerAuthority>> getAll() {
        return ResponseEntity.ok(authorityService.getAll());
    }

    @DeleteMapping("/{authorityDetails}")
    public ResponseEntity<Void> delete(
            @PathVariable String authorityDetails
    ) {
        authorityService.delete(authorityDetails);
        return ResponseEntity.noContent().build();
    }
}
