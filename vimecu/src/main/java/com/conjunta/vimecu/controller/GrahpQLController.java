package com.conjunta.vimecu.controller;

import com.conjunta.vimecu.model.*;
import com.conjunta.vimecu.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class GrahpQLController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AssignmentService assignmentService;

    // Account Queries
    @QueryMapping
    public Account getAccountById(@Argument Long id) {
        return accountService.getAccountById(id).orElse(null);
    }

    @QueryMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Account Mutations
    @MutationMapping
    public Account createAccount(@Argument String username, @Argument String email, @Argument String password) {
        Account account = new Account();
        account.setUsername(username);
        account.setEmail(email);
        account.setPassword(password);
        return accountService.saveAccount(account);
    }


    @MutationMapping
    public String deleteAccount(@Argument Long id) {
        accountService.deleteAccount(id);
        return "Account deleted successfully.";
    }

    // Project Queries
    @QueryMapping
    public Project getProjectById(@Argument Long id) {
        return projectService.getProjectById(id).orElse(null);
    }

    @QueryMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Project Mutations
    @MutationMapping
    public Project createProject(@Argument String name, @Argument String description, @Argument String status) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setStatus(status);
        return projectService.saveProject(project);
    }

    @MutationMapping
    public String deleteProject(@Argument Long id) {
        projectService.deleteProject(id);
        return "Project deleted successfully.";
    }

    // Task Queries
    @QueryMapping
    public Task getTaskById(@Argument Long id) {
        return taskService.getTaskById(id).orElse(null);
    }

    @QueryMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Task Mutations
    @MutationMapping
    public Task createTask(@Argument Long projectId, @Argument String name, @Argument String description, @Argument String status) {
        Task task = new Task();
        task.setName(name);
        task.setDescription(description);
        task.setStatus(status);
        task.setProject(projectService.getProjectById(projectId).orElse(null));
        return taskService.saveTask(task);
    }

    @MutationMapping
    public String deleteTask(@Argument Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully.";
    }

    // Employee Queries
    @QueryMapping
    public Employee getEmployeeById(@Argument Long id) {
        return employeeService.getEmployeeById(id).orElse(null);
    }

    @QueryMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Employee Mutations
    @MutationMapping
    public Employee createEmployee(@Argument String name, @Argument String email, @Argument String phone) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setEmail(email);
        employee.setPhone(phone);
        return employeeService.saveEmployee(employee);
    }

    @MutationMapping
    public String deleteEmployee(@Argument Long id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully.";
    }

    // Assignment Queries
    @QueryMapping
    public Assignment getAssignmentById(@Argument Long id) {
        return assignmentService.getAssignmentById(id).orElse(null);
    }

    @QueryMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    // Assignment Mutations
    @MutationMapping
    public Assignment createAssignment(@Argument Long taskId, @Argument Long employeeId, @Argument int time) {
        Assignment assignment = new Assignment();
        assignment.setTask(taskService.getTaskById(taskId).orElse(null));
        assignment.setEmployee(employeeService.getEmployeeById(employeeId).orElse(null));
        assignment.setTime(time);
        return assignmentService.saveAssignment(assignment);
    }


    @MutationMapping
    public String deleteAssignment(@Argument Long id) {
        assignmentService.deleteAssignment(id);
        return "Assignment deleted successfully.";
    }

    // Account Mutations
    @MutationMapping
    public Account updateAccount(@Argument Long id, @Argument String username, @Argument String email, @Argument String password) {
        Account account = accountService.getAccountById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        account.setUsername(username);
        account.setEmail(email);
        account.setPassword(password);
        return accountService.saveAccount(account);
    }

    // Project Mutations
    @MutationMapping
    public Project updateProject(@Argument Long id, @Argument String name, @Argument String description, @Argument String status) {
        Project project = projectService.getProjectById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(name);
        project.setDescription(description);
        project.setStatus(status);
        return projectService.saveProject(project);
    }

    // Task Mutations
    @MutationMapping
    public Task updateTask(@Argument Long id, @Argument Long projectId, @Argument String name, @Argument String description, @Argument String status) {
        Task task = taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setName(name);
        task.setDescription(description);
        task.setStatus(status);
        task.setProject(projectService.getProjectById(projectId).orElse(null));
        return taskService.saveTask(task);
    }

    // Employee Mutations
    @MutationMapping
    public Employee updateEmployee(@Argument Long id, @Argument String name, @Argument String email, @Argument String phone) {
        Employee employee = employeeService.getEmployeeById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setName(name);
        employee.setEmail(email);
        employee.setPhone(phone);
        return employeeService.saveEmployee(employee);
    }

    // Assignment Mutations
    @MutationMapping
    public Assignment updateAssignment(@Argument Long id, @Argument Long taskId, @Argument Long employeeId, @Argument int time) {
        Assignment assignment = assignmentService.getAssignmentById(id).orElseThrow(() -> new RuntimeException("Assignment not found"));
        assignment.setTask(taskService.getTaskById(taskId).orElse(null));
        assignment.setEmployee(employeeService.getEmployeeById(employeeId).orElse(null));
        assignment.setTime(time);
        return assignmentService.saveAssignment(assignment);
    }

}
