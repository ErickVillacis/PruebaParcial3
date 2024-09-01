package com.conjunta.vimecu.model;

import com.conjunta.vimecu.model.Employee;
import com.conjunta.vimecu.model.Task;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "assignment")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    @JsonIgnoreProperties({"name", "description", "status", "assignments", "project"})
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonIgnoreProperties({"name", "email", "phone", "assignments"})
    private Employee employee;

    private int time;
}
