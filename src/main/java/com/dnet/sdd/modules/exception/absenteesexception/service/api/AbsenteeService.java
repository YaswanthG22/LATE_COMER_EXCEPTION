package com.dnet.sdd.modules.exception.absenteesexception.service.api;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dnet.sdd.modules.exception.absenteesexception.dto.AbsenteeRequest;
import com.dnet.sdd.modules.exception.common.dto.SubmittedRecordDTO;

public interface AbsenteeService {

    void saveAll(List<AbsenteeRequest> records, MultipartFile pdfFile);

    List<SubmittedRecordDTO> getAll();
}
