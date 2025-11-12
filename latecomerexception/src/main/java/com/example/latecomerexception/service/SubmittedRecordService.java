package com.example.latecomerexception.service;

import com.example.latecomerexception.dto.SubmittedRecordDTO;
import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubmittedRecordService {

    private final LateComerRecordRepository lateComerRepo;
    private final AuthorityDocumentRepository authorityRepo;

    // change this to match your React API URL if needed
    private static final String FILE_BASE_URL = "http://localhost:8080/api/files/";

    public SubmittedRecordService(LateComerRecordRepository lateComerRepo,
                                  AuthorityDocumentRepository authorityRepo) {
        this.lateComerRepo = lateComerRepo;
        this.authorityRepo = authorityRepo;
    }

    public List<SubmittedRecordDTO> getAllRecords() {
        List<LateComerRecord> lateComers = lateComerRepo.findAll();
        List<AuthorityDocument> authorities = authorityRepo.findAll();

        // ✅ Map authority details (lowercase + trimmed) → pdf path
        Map<String, String> authorityMap = authorities.stream()
                .filter(a -> a.getAuthorityDetails() != null && a.getPdfPath() != null)
                .collect(Collectors.toMap(
                        a -> a.getAuthorityDetails().trim().toLowerCase(),
                        AuthorityDocument::getPdfPath,
                        (a, b) -> a
                ));

        // ✅ Group by personNo + authorityDetails
        Map<String, List<LateComerRecord>> grouped = lateComers.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getPersonNo() + "|" + r.getAuthorityDetails()
                ));

        List<SubmittedRecordDTO> result = new ArrayList<>();

        for (Map.Entry<String, List<LateComerRecord>> entry : grouped.entrySet()) {
            List<LateComerRecord> group = entry.getValue();
            LateComerRecord sample = group.get(0);

            LocalDate minDate = group.stream()
                    .map(LateComerRecord::getRecordDate)
                    .min(LocalDate::compareTo)
                    .orElse(null);

            LocalDate maxDate = group.stream()
                    .map(LateComerRecord::getRecordDate)
                    .max(LocalDate::compareTo)
                    .orElse(null);

            String key = sample.getAuthorityDetails().trim().toLowerCase();
            String pdfPath = authorityMap.getOrDefault(key, null);

            // Debug log
            System.out.println("🔍 Matching full key: '" + key + "' → " + pdfPath);

            SubmittedRecordDTO dto = new SubmittedRecordDTO();
            dto.setId(sample.getId());
            dto.setPersonNo(sample.getPersonNo());
            dto.setAuthorityDetails(sample.getAuthorityDetails());
            dto.setRecordDate(
                    minDate.equals(maxDate)
                            ? minDate.toString()
                            : minDate + " → " + maxDate
            );

            if (pdfPath != null && !pdfPath.equalsIgnoreCase("No File")) {
                String fileName = new File(pdfPath).getName();
                // ✅ Web-accessible URL for frontend
                dto.setPdfSource(FILE_BASE_URL + fileName);
            } else {
                dto.setPdfSource("No file");
            }

            result.add(dto);
        }

        // ✅ Sort newest first
        result.sort(Comparator.comparing(SubmittedRecordDTO::getId).reversed());
        return result;
    }
}
