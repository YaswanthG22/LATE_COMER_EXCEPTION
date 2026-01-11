package com.dnet.sdd.modules.exception.absenteesexception.service.impl;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.dnet.sdd.modules.exception.absenteesexception.dto.AbsenteeRequest;
import com.dnet.sdd.modules.exception.absenteesexception.entity.AbsenteeId;
import com.dnet.sdd.modules.exception.absenteesexception.entity.AbsenteeRecord;
import com.dnet.sdd.modules.exception.absenteesexception.repository.AbsenteeRepository;
import com.dnet.sdd.modules.exception.absenteesexception.repository.AbsenteesAuthorityRepository;
import com.dnet.sdd.modules.exception.absenteesexception.service.api.AbsenteeService;
import com.dnet.sdd.modules.exception.common.dto.SubmittedRecordDTO;

@Service
@RequiredArgsConstructor
@Transactional
public class AbsenteeServiceImpl implements AbsenteeService {

    private final AbsenteeRepository repository;
    private final AbsenteesAuthorityRepository authorityRepository;

    private static final String FILE_BASE_URL =
            "http://localhost:8080/api/files/absentees/";

    // ================= SAVE =================
    @Override
    public void saveAll(List<AbsenteeRequest> records, MultipartFile pdfFile) {

        if (records == null || records.isEmpty()) {
            return;
        }

        List<AbsenteeRecord> entities = records.stream()
                .map(r -> new AbsenteeRecord(
                        new AbsenteeId(
                                r.getPersonNo(),
                                r.getFromDate(),
                                r.getToDate()
                        ),
                        r.getAuthorityDetails(),
                        r.getUserPersNo(),
                        r.getUserIp(),
                        r.getTrDate()
                ))
                .toList();

        repository.saveAll(entities);
    }

    // ================= VIEW =================
    @Override
    public List<SubmittedRecordDTO> getAll() {

        return repository.findAll().stream().map(r -> {

            AbsenteeId id = r.getId();
            String pdfSource = null;

            if (r.getAuthorityDetails() != null) {
                Optional<String> pdfPathOpt =
                        authorityRepository.findById(r.getAuthorityDetails())
                                .map(a -> a.getPdfPath());

                if (pdfPathOpt.isPresent() && pdfPathOpt.get() != null) {
                    String encoded = URLEncoder.encode(
                            new File(pdfPathOpt.get()).getName(),
                            StandardCharsets.UTF_8
                    );
                    pdfSource = FILE_BASE_URL + encoded;
                }
            }

            return new SubmittedRecordDTO(
                    id.getPersonNo(),
                    id.getFromDate() + " → " + id.getToDate(),
                    r.getAuthorityDetails(),
                    pdfSource   // may be null → frontend handles safely
            );

        }).collect(Collectors.toList());
    }
}
