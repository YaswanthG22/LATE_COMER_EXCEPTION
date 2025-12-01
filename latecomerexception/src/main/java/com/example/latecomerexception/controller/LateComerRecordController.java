package com.example.latecomerexception.controller;

import com.example.latecomerexception.dto.LateComerRecordRequest;
import com.example.latecomerexception.service.LateComerRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/latecomer")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class LateComerRecordController {

	private final LateComerRecordService service;

	@PostMapping("/save")
	public ResponseEntity<String> saveLateComers(@RequestBody List<LateComerRecordRequest> requests) {
		try {
			service.saveLateComers(requests);
			return ResponseEntity.ok("Late Comer Records saved successfully!");
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Failed to save data: " + e.getMessage());
		}
	}
}
