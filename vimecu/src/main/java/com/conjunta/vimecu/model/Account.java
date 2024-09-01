package com.conjunta.vimecu.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "account")

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String password;
}
