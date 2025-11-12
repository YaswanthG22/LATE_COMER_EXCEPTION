package com.example.latecomerexception.service;

import com.example.latecomerexception.entity.Employee;
import com.example.latecomerexception.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee addEmployee(Employee e) {
        return repo.save(e);
    }

    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }
}
