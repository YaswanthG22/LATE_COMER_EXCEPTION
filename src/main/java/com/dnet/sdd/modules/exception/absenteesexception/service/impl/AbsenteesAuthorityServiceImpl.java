package com.dnet.sdd.modules.exception.absenteesexception.service.impl;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.dnet.sdd.modules.exception.absenteesexception.entity.AbsenteesAuthority;
import com.dnet.sdd.modules.exception.absenteesexception.repository.AbsenteesAuthorityRepository;
import com.dnet.sdd.modules.exception.absenteesexception.service.api.AbsenteesAuthorityService;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.FileStorageService;

@Service
@RequiredArgsConstructor
@Transactional
public class AbsenteesAuthorityServiceImpl implements AbsenteesAuthorityService {

    private final AbsenteesAuthorityRepository repository;
    private final FileStorageService fileStorageService;

    @Override
    public AbsenteesAuthority saveAuthority(
            String authorityDetails,
            MultipartFile pdfFile
    ) {

        // ✅ SAFETY: do nothing if authority is empty
        if (authorityDetails == null || authorityDetails.isBlank()) {
            return null;
        }

        File tempFile = null;
        File finalFile = null;

        try {
            // ✅ Save PDF only if provided
            if (pdfFile != null && !pdfFile.isEmpty()) {
                tempFile = fileStorageService.saveTempFile(pdfFile);
                finalFile = fileStorageService.moveToFinal(
                        tempFile,
                        pdfFile.getOriginalFilename(),
                        "absentees"   // ✅ CORRECT FOLDER
                );
            }

            Optional<AbsenteesAuthority> existingOpt =
                    repository.findById(authorityDetails);

            AbsenteesAuthority authority;

            if (existingOpt.isPresent()) {
                // 🔁 UPDATE existing authority
                authority = existingOpt.get();

                // ✅ Update PDF ONLY if new file uploaded
                if (finalFile != null) {
                    authority.setPdfPath(finalFile.getName());
                }

            } else {
                // ➕ CREATE new authority
                authority = AbsenteesAuthority.builder()
                        .authorityDetails(authorityDetails)
                        .pdfPath(finalFile != null ? finalFile.getName() : null)
                        .moduleType("ABSENTEES")
                        .build();
            }

            // ✅ Always ensure correct module type
            authority.setModuleType("ABSENTEES");

            return repository.save(authority);

        } finally {
            // ✅ Always cleanup temp file
            fileStorageService.deleteIfExists(tempFile);
        }
    }

    @Override
    public List<AbsenteesAuthority> getAll() {
        return repository.findAll();
    }

    @Override
    public void delete(String authorityDetails) {
        repository.deleteById(authorityDetails);
    }
}
