package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.entity.LateComerRecordId;
import com.example.latecomerexception.exception.ApiException;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.repository.LateComerRecordRepository;
import com.example.latecomerexception.service.api.FileStorageService;
import com.example.latecomerexception.service.api.LateComerSubmissionService;
import com.example.latecomerexception.validation.DateConflictValidator;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LateComerSubmissionServiceImpl implements LateComerSubmissionService {

    private final LateComerRecordRepository lateComerRepository;
    private final AuthorityDocumentRepository authorityRepo;
    private final DateConflictValidator validator;
    private final FileStorageService fileStorage;

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitAll(List<LateComerRecordRequest> requests,
                          String authorityDetails,
                          MultipartFile pdfFile) {

        validateInputs(requests, authorityDetails, pdfFile);

        File tempFile = fileStorage.saveTempFile(pdfFile);
        String finalPath = FileStorageService.UPLOAD_DIR + pdfFile.getOriginalFilename();

        try {
            // Save authority doc
        	AuthorityDocument doc = AuthorityDocument.builder()
        	        .authorityDetails(authorityDetails)
        	        .pdfPath(finalPath)
        	        .build();
            authorityRepo.save(doc);

            List<LateComerRecord> records = buildRecords(requests, authorityDetails);
            lateComerRepository.saveAll(records);

            em.flush(); // force DB errors now

            registerFileSynchronization(tempFile, finalPath);

        } catch (Exception ex) {
            fileStorage.deleteIfExists(tempFile);
            throw new ApiException(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void validateInputs(List<LateComerRecordRequest> requests,
                                String authorityDetails,
                                MultipartFile pdfFile) {
        if (authorityDetails == null || authorityDetails.trim().isEmpty()) {
            throw new ApiException("Authority details cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if (pdfFile == null || pdfFile.isEmpty()) {
            throw new ApiException("PDF file is required", HttpStatus.BAD_REQUEST);
        }
        requests.forEach(req ->
                validator.validateNoDateConflict(req.getPersonNo(), req.getRecordDate(), req.getRecordDate())
        );
    }

    private List<LateComerRecord> buildRecords(List<LateComerRecordRequest> requests,
                                               String authorityDetails) {
        return requests.stream()
                .map(req -> new LateComerRecord(
                        new LateComerRecordId(req.getPersonNo(), req.getRecordDate()),
                        authorityDetails,
                        req.getInsertedDate()
                ))
                .collect(Collectors.toList());
    }

    private void registerFileSynchronization(File tempFile, String finalPath) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                fileStorage.moveToFinal(tempFile, finalPath);
            }
            @Override
            public void afterCompletion(int status) {
                if (status == TransactionSynchronization.STATUS_ROLLED_BACK) {
                    fileStorage.deleteIfExists(tempFile);
                }
            }
        });
    }
}
