package com.dnet.sdd.modules.exception.latecomerexception.service.api;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    File saveTempFile(MultipartFile file);
    File moveToFinal(File tempFile, String originalFileName, String module);
    void deleteIfExists(File file);
}