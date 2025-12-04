package com.example.latecomerexception.service.api;

import com.example.latecomerexception.dto.SubmittedRecordDTO;
import java.util.List;

public interface SubmittedRecordService {
    List<SubmittedRecordDTO> getAllRecords();
}
