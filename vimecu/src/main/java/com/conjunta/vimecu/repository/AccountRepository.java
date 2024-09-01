package com.conjunta.vimecu.repository;

import com.conjunta.vimecu.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmailAndPassword(String email, String password);
}
