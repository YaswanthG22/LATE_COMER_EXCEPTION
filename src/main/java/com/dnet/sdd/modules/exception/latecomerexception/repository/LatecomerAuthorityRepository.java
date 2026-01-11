package com.dnet.sdd.modules.exception.latecomerexception.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dnet.sdd.modules.exception.latecomerexception.entity.LatecomerAuthority;

public interface LatecomerAuthorityRepository
        extends JpaRepository<LatecomerAuthority, String> {
}
