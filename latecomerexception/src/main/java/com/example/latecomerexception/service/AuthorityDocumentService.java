package com.example.latecomerexception.service;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityDocumentService {

    private final AuthorityDocumentRepository repository;

    public AuthorityDocumentService(AuthorityDocumentRepository repository) {
        this.repository = repository;
    }

    public AuthorityDocument saveDocument(AuthorityDocument document) {
        return repository.save(document);
    }

    public List<AuthorityDocument> getAllDocuments() {
        return repository.findAll();
    }

    public void deleteDocument(Long id) {
        repository.deleteById(id);
    }
}
