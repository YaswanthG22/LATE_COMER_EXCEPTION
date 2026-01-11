package com.dnet.sdd.modules.exception.absenteesexception.service.api;

import com.dnet.sdd.modules.exception.absenteesexception.dto.AbsenteeRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AbsenteeSubmissionService {
    void submitAll(List<AbsenteeRequest> records, MultipartFile pdfFile);
}
