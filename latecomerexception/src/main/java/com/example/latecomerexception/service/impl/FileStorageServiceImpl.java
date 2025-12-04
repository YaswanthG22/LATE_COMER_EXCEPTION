package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.exception.ApiException;
import com.example.latecomerexception.service.api.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    @Override
    public File saveTempFile(MultipartFile file) {
        try {
            File tempFolder = new File(TEMP_DIR);
            if (!tempFolder.exists()) tempFolder.mkdirs();

            File tempFile = new File(TEMP_DIR, file.getOriginalFilename());
            Files.copy(file.getInputStream(), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            log.info("TEMP FILE SAVED: {}", tempFile.getAbsolutePath());
            return tempFile;

        } catch (Exception e) {
            throw new ApiException("Failed to save temporary file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public File moveToFinal(File tempFile, String finalPath) {
        try {
            File finalDir = new File(UPLOAD_DIR);
            if (!finalDir.exists()) finalDir.mkdirs();

            File finalFile = new File(finalPath);
            Files.move(tempFile.toPath(), finalFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            log.info("FILE MOVED → {}", finalFile.getAbsolutePath());
            return finalFile;

        } catch (Exception e) {
            throw new ApiException("Failed to save final PDF", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void deleteIfExists(File file) {
        if (file != null && file.exists()) {
            boolean ok = file.delete();
            log.warn("FILE DELETE {}: {}", ok ? "OK" : "FAILED", file.getAbsolutePath());
        }
    }
}
