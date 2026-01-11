package com.dnet.sdd.modules.exception.absenteesexception.service.impl;

import com.dnet.sdd.modules.exception.absenteesexception.dto.AbsenteeRequest;
import com.dnet.sdd.modules.exception.absenteesexception.entity.*;
import com.dnet.sdd.modules.exception.absenteesexception.repository.*;
import com.dnet.sdd.modules.exception.absenteesexception.service.api.AbsenteeSubmissionService;
import com.dnet.sdd.modules.exception.common.validation.DateRangeConflictValidator;
import com.dnet.sdd.modules.exception.common.validation.DateRangeExtractor;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.FileStorageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackFor = Exception.class)
public class AbsenteeSubmissionServiceImpl implements AbsenteeSubmissionService {

    private final AbsenteeRepository recordRepository;
    private final AbsenteesAuthorityRepository authorityRepository;
    private final FileStorageService fileStorageService;
    private final DateRangeConflictValidator validator;

    @Override
    public void submitAll(List<AbsenteeRequest> records, MultipartFile pdfFile) {

        for (AbsenteeRequest r : records) {
            validator.validateNoOverlap(
                    r.getPersonNo(),
                    r.getFromDate(),
                    r.getToDate(),
                    recordRepository.findAll(),
                    new DateRangeExtractor<AbsenteeRecord>() {
                        public String getPersonNo(AbsenteeRecord rec) {
                            return rec.getId().getPersonNo();
                        }
                        public LocalDate getFromDate(AbsenteeRecord rec) {
                            return rec.getId().getFromDate();
                        }
                        public LocalDate getToDate(AbsenteeRecord rec) {
                            return rec.getId().getToDate();
                        }
                    },
                    "Absentee"
            );
        }

        File tempFile = null;
        File finalFile = null;

        try {
            if (pdfFile != null && !pdfFile.isEmpty()) {
                tempFile = fileStorageService.saveTempFile(pdfFile);
                finalFile = fileStorageService.moveToFinal(
                        tempFile,
                        pdfFile.getOriginalFilename(),
                        "absentees"
                );
            }

            String authorityDetails = records.get(0).getAuthorityDetails();

            authorityRepository.save(
                    AbsenteesAuthority.builder()
                            .authorityDetails(authorityDetails)
                            .pdfPath(finalFile != null ? finalFile.getName() : null)
                            .moduleType("ABSENTEES")
                            .build()
            );

            for (AbsenteeRequest r : records) {
                recordRepository.save(
                        AbsenteeRecord.builder()
                                .id(new AbsenteeId(
                                        r.getPersonNo(),
                                        r.getFromDate(),
                                        r.getToDate()
                                ))
                                .authorityDetails(authorityDetails)
                                .userPersNo(r.getUserPersNo())
                                .userIp(r.getUserIp())
                                .trDate(LocalDate.now())
                                .build()
                );
            }

        } finally {
            fileStorageService.deleteIfExists(tempFile);
        }
    }
}
