package com.example.latecomerexception.service;

import com.example.latecomerexception.entity.Employee;
import com.example.latecomerexception.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    public void deleteEmployee(String personNo) {
        repository.deleteById(personNo);
    }
}
