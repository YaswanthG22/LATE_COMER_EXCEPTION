package com.example.latecomerexception.service.api;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface LateComerSubmissionService {
    void submitAll(List<LateComerRecordRequest> requests,
                   String authorityDetails,
                   MultipartFile pdfFile);
}
