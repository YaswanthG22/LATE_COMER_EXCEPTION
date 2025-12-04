package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.entity.AuthorityDocument;
import com.example.latecomerexception.repository.AuthorityDocumentRepository;
import com.example.latecomerexception.service.api.AuthorityDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorityDocumentServiceImpl implements AuthorityDocumentService {

    private final AuthorityDocumentRepository repository;

    @Override
    public AuthorityDocument saveDocument(AuthorityDocument document) {
        return repository.save(document);
    }

    @Override
    public List<AuthorityDocument> getAllDocuments() {
        return repository.findAll();
    }

    @Override
    public void deleteDocument(String id) {
        repository.deleteById(id);
    }
}
