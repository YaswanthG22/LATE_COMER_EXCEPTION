package com.dnet.sdd.modules.exception.absenteesexception.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dnet.sdd.modules.exception.absenteesexception.entity.AbsenteesAuthority;

@Repository
public interface AbsenteesAuthorityRepository
        extends JpaRepository<AbsenteesAuthority, String> {
}
