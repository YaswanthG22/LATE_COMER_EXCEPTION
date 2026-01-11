package com.dnet.sdd.modules.exception.absenteesexception.repository;

import com.dnet.sdd.modules.exception.absenteesexception.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbsenteeRepository extends JpaRepository<AbsenteeRecord, AbsenteeId> {
}
