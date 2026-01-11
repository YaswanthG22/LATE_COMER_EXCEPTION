package com.dnet.sdd.modules.exception.latecomerexception.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dnet.sdd.modules.exception.latecomerexception.entity.LateComerRecord;
import com.dnet.sdd.modules.exception.latecomerexception.entity.LateComerRecordId;

import java.util.List;

@Repository
public interface LateComerRecordRepository extends JpaRepository<LateComerRecord, LateComerRecordId> {

    // Nested property inside @EmbeddedId
    List<LateComerRecord> findByIdPersonNo(String personNo);
}
