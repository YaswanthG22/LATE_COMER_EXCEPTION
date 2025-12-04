package com.example.latecomerexception.service.api;

import com.example.latecomerexception.entity.AuthorityDocument;
import java.util.List;

public interface AuthorityDocumentService {
    AuthorityDocument saveDocument(AuthorityDocument document);
    List<AuthorityDocument> getAllDocuments();
    void deleteDocument(String id);
}
