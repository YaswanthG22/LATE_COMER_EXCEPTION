package com.example.latecomerexception.repository;

import com.example.latecomerexception.entity.LateComerRecord;
import com.example.latecomerexception.entity.LateComerRecordId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LateComerRecordRepository extends JpaRepository<LateComerRecord, LateComerRecordId> {

    // Nested property inside @EmbeddedId
    List<LateComerRecord> findByIdPersonNo(String personNo);
}
