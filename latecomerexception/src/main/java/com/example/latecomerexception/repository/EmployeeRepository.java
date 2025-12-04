package com.example.latecomerexception.repository;

import com.example.latecomerexception.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
