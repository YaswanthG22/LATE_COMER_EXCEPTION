package com.dnet.sdd.modules.exception.common;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dnet.sdd.modules.exception.latecomerexception.exception.ApiException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles all custom business exceptions
     * (Latecomer, Absentees, Late-Early-Out)
     */
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handleApiException(ApiException ex) {

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", ex.getMessage());
        response.put("status", ex.getStatus().value());

        return ResponseEntity
                .status(ex.getStatus())
                .body(response);
    }

    /**
     * Handles unexpected system errors
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleOtherExceptions(Exception ex) {

        ex.printStackTrace(); // keep for debugging

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Internal server error");
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
