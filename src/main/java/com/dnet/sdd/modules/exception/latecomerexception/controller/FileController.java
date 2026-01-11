package com.dnet.sdd.modules.exception.latecomerexception.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    private static final String BASE_DIR = "A:/DRDL DIT/uploads";

    /**
     * Examples:
     * /api/files/latecomer/LC_123.pdf
     * /api/files/lateearlyout/LEO_456.pdf
     * /api/files/absentees/ABS_789.pdf
     */
    @GetMapping("/{module}/{filename:.+}")
    public ResponseEntity<Resource> getFile(
            @PathVariable String module,
            @PathVariable String filename
    ) {
        try {
            // ✅ REQUIRED FIX: decode filename
            filename = URLDecoder.decode(filename, StandardCharsets.UTF_8);
            filename = filename.replace("+", " ");

            // ✅ SAFETY: normalize module name (matches storage)
            module = module.toLowerCase();

            // ✅ SAFETY: block path traversal
            if (filename.contains("..")) {
                return ResponseEntity.badRequest().build();
            }

            Path filePath = Paths.get(BASE_DIR)
                    .resolve(module)
                    .resolve(filename)
                    .normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/pdf";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + filename + "\""
                    )
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
