package com.conjunta.vimecu.service;

import com.conjunta.vimecu.model.Account;
import com.conjunta.vimecu.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    public Boolean login(String email, String password) {
        Account account = accountRepository.findByEmailAndPassword(email, password);
        return account != null;  // Retorna true si se encuentra una cuenta, false si no
    }
}
