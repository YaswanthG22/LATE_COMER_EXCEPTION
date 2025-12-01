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

    private static final String FILE_BASE_URL = "http://localhost:8080/api/files/";

    public SubmittedRecordService(LateComerRecordRepository lateComerRepo,
                                  AuthorityDocumentRepository authorityRepo) {
        this.lateComerRepo = lateComerRepo;
        this.authorityRepo = authorityRepo;
    }

    public List<SubmittedRecordDTO> getAllRecords() {

        List<LateComerRecord> lateComers = lateComerRepo.findAll();
        List<AuthorityDocument> authorities = authorityRepo.findAll();

        // Map authorityDetails → pdfPath
        Map<String, String> authorityMap = authorities.stream()
                .filter(a -> a.getAuthorityDetails() != null && a.getPdfPath() != null)
                .collect(Collectors.toMap(
                        a -> a.getAuthorityDetails().trim().toLowerCase(),
                        AuthorityDocument::getPdfPath,
                        (a, b) -> a
                ));

        // Group by PERSON_NO + AUTHORITY_DETAILS
        Map<String, List<LateComerRecord>> grouped = lateComers.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getId().getPersonNo() + "|" + r.getAuthorityDetails()
                ));

        List<SubmittedRecordDTO> result = new ArrayList<>();

        for (Map.Entry<String, List<LateComerRecord>> entry : grouped.entrySet()) {

            List<LateComerRecord> group = entry.getValue();
            LateComerRecord sample = group.get(0);

            // Extract dates from composite primary key
            LocalDate minDate = group.stream()
                    .map(r -> r.getId().getRecordDate())
                    .min(LocalDate::compareTo)
                    .orElse(null);

            LocalDate maxDate = group.stream()
                    .map(r -> r.getId().getRecordDate())
                    .max(LocalDate::compareTo)
                    .orElse(null);

            SubmittedRecordDTO dto = new SubmittedRecordDTO();

            dto.setPersonNo(sample.getId().getPersonNo());
            dto.setAuthorityDetails(sample.getAuthorityDetails());

            // Date range
            dto.setRecordDate(
                    minDate.equals(maxDate)
                            ? minDate.toString()
                            : minDate + " → " + maxDate
            );

            // Store max date for sorting
            dto.setSortDate(maxDate);

            // Resolve PDF
            String key = sample.getAuthorityDetails().trim().toLowerCase();
            String pdfPath = authorityMap.getOrDefault(key, null);

            if (pdfPath != null && !pdfPath.equalsIgnoreCase("No File")) {
                String fileName = new File(pdfPath).getName();
                dto.setPdfSource(FILE_BASE_URL + fileName);
            } else {
                dto.setPdfSource("No file");
            }

            result.add(dto);
        }

        // Sort by actual LocalDate (DESC)
        result.sort(Comparator.comparing(SubmittedRecordDTO::getSortDate).reversed());

        return result;
    }
}
