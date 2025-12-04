package com.example.latecomerexception.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthorityDocumentRequest {

    @NotBlank(message = "Authority details are required")
    private String authorityDetails;
}
