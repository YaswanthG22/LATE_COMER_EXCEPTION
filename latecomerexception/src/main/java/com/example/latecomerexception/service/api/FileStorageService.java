package com.example.latecomerexception.service.api;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;

public interface FileStorageService {
    String UPLOAD_DIR = "A:/DRDL DIT/uploads/";
    String TEMP_DIR   = System.getProperty("java.io.tmpdir") + "/latecomer-temp/";

    File saveTempFile(MultipartFile file);
    File moveToFinal(File tempFile, String finalPath);
    void deleteIfExists(File file);
}
