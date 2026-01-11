package com.dnet.sdd.modules.exception.latecomerexception.service.api;

import java.util.List;

import com.dnet.sdd.modules.exception.latecomerexception.entity.Employee;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Employee addEmployee(Employee employee);
    void deleteEmployee(String personNo);
}
