package com.dnet.sdd.modules.exception.latecomerexception.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dnet.sdd.modules.exception.latecomerexception.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
