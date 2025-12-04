package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.dto.SubmittedRecordDTO;
import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import com.example.latecomerexception.service.api.SubmittedRecordService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubmittedRecordServiceImpl implements SubmittedRecordService {

    private final LateComerRecordRepository lateComerRepo;
    private final AuthorityDocumentRepository authorityRepo;

    private static final String FILE_BASE_URL = "http://localhost:8080/api/files/";

    public SubmittedRecordServiceImpl(LateComerRecordRepository lateComerRepo,
                                      AuthorityDocumentRepository authorityRepo) {
        this.lateComerRepo = lateComerRepo;
        this.authorityRepo = authorityRepo;
    }

    @Override
    public List<SubmittedRecordDTO> getAllRecords() {

        List<LateComerRecord> lateComers = lateComerRepo.findAll();
        List<AuthorityDocument> authorities = authorityRepo.findAll();

        Map<String, String> authorityMap = buildAuthorityMap(authorities);
        Map<String, List<LateComerRecord>> grouped = groupRecords(lateComers);

        List<SubmittedRecordDTO> result = new ArrayList<>();

        for (Map.Entry<String, List<LateComerRecord>> entry : grouped.entrySet()) {

            List<LateComerRecord> group = entry.getValue();
            LateComerRecord sample = group.get(0);

            LocalDate minDate = group.stream().map(r -> r.getId().getRecordDate())
                    .min(LocalDate::compareTo).orElse(null);

            LocalDate maxDate = group.stream().map(r -> r.getId().getRecordDate())
                    .max(LocalDate::compareTo).orElse(null);

            SubmittedRecordDTO dto = new SubmittedRecordDTO();
            dto.setPersonNo(sample.getId().getPersonNo());
            dto.setAuthorityDetails(sample.getAuthorityDetails());
            dto.setRecordDate(minDate.equals(maxDate) ? minDate.toString() : (minDate + " → " + maxDate));
            dto.setSortDate(maxDate);

            String key = sample.getAuthorityDetails().trim().toLowerCase();
            String pdfPath = authorityMap.getOrDefault(key, null);

            if (pdfPath != null) {
                String fileName = new File(pdfPath).getName();
                dto.setPdfSource(FILE_BASE_URL + fileName);
            } else {
                dto.setPdfSource("No file");
            }

            result.add(dto);
        }

        result.sort(Comparator.comparing(SubmittedRecordDTO::getSortDate).reversed());
        return result;
    }

    private Map<String, String> buildAuthorityMap(List<AuthorityDocument> authorities) {
        return authorities.stream()
                .filter(a -> a.getAuthorityDetails() != null && a.getPdfPath() != null)
                .collect(Collectors.toMap(
                        a -> a.getAuthorityDetails().trim().toLowerCase(),
                        AuthorityDocument::getPdfPath,
                        (a, b) -> a
                ));
    }

    private Map<String, List<LateComerRecord>> groupRecords(List<LateComerRecord> lateComers) {
        return lateComers.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getId().getPersonNo() + "|" + r.getAuthorityDetails()
                ));
    }
}
