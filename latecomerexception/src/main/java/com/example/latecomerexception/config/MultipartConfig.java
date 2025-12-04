package com.example.latecomerexception.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import java.io.File;

@Configuration
public class MultipartConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        // FORCE SPRING TO USE A COMPLETELY DIFFERENT TEMP FOLDER
        String tempDir = System.getProperty("java.io.tmpdir") + "/spring-upload-temp/";
        File tmpFile = new File(tempDir);
        if (!tmpFile.exists()) tmpFile.mkdirs();

        factory.setLocation(tempDir);

        return factory.createMultipartConfig();
    }
}
