package com.example.latecomerexception.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.latecomerexception.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
