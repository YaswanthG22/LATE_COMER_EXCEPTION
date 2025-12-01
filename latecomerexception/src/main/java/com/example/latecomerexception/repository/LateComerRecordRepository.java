package com.example.latecomerexception.repository;

import com.example.latecomerexception.entity.LateComerRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LateComerRecordRepository extends JpaRepository<LateComerRecord, Long> {
}
