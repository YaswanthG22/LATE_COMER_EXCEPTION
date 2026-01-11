package com.dnet.sdd.modules.exception.latecomerexception.controller;

import com.dnet.sdd.modules.exception.latecomerexception.entity.Employee;
import com.dnet.sdd.modules.exception.latecomerexception.service.api.EmployeeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return service.addEmployee(employee);
    }

    @DeleteMapping("/{personNo}")
    public void deleteEmployee(@PathVariable String personNo) {
        service.deleteEmployee(personNo);
    }
}
