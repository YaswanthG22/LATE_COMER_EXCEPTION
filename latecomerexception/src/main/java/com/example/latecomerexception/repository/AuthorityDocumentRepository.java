// src/main/java/com/example/latecomerexception/repository/AuthorityDocumentRepository.java
package com.example.latecomerexception.repository;

import com.example.latecomerexception.entity.AuthorityDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityDocumentRepository extends JpaRepository<AuthorityDocument, String> {
}
