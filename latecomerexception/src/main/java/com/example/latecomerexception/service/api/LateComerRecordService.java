package com.example.latecomerexception.service.api;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import java.util.List;

public interface LateComerRecordService {
    void saveLateComers(List<LateComerRecordRequest> requests);
}
