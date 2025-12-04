package com.example.latecomerexception.service.api;

import com.example.latecomerexception.entity.Employee;
import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Employee addEmployee(Employee employee);
    void deleteEmployee(String personNo);
}
