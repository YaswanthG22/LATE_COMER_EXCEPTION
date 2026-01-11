package com.dnet.sdd.modules.exception.absenteesexception.service.api;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dnet.sdd.modules.exception.absenteesexception.entity.AbsenteesAuthority;

public interface AbsenteesAuthorityService {

    AbsenteesAuthority saveAuthority(String authorityDetails, MultipartFile pdfFile);

    List<AbsenteesAuthority> getAll();

    void delete(String authorityDetails);
}
