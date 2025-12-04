package com.example.latecomerexception.service.impl;

import com.example.latecomerexception.entity.Employee;
import com.example.latecomerexception.repository.EmployeeRepository;
import com.example.latecomerexception.service.api.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public void deleteEmployee(String personNo) {
        repository.deleteById(personNo);
    }
}
