package com.banking.controller;

import com.banking.domain.dto.AccountDTO;
import com.banking.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody AccountDTO accountDTO) {
        return new ResponseEntity<>(accountService.createAccount(accountDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{idConta}")
    public ResponseEntity<AccountDTO> getAccount(@PathVariable Long idConta) {
        return ResponseEntity.ok(accountService.getAccount(idConta));
    }

    @PostMapping("/{idConta}/deposit")
    public ResponseEntity<AccountDTO> deposit(
            @PathVariable Long idConta,
            @RequestParam BigDecimal valor) {
        return ResponseEntity.ok(accountService.deposit(idConta, valor));
    }

    @PostMapping("/{idConta}/withdraw")
    public ResponseEntity<AccountDTO> withdraw(
            @PathVariable Long idConta,
            @RequestParam BigDecimal valor) {
        return ResponseEntity.ok(accountService.withdraw(idConta, valor));
    }

    @PatchMapping("/{idConta}/block")
    public ResponseEntity<AccountDTO> blockAccount(@PathVariable Long idConta) {
        return ResponseEntity.ok(accountService.blockAccount(idConta));
    }

    @GetMapping("/{idConta}/balance")
    public ResponseEntity<BigDecimal> getBalance(@PathVariable Long idConta) {
        return ResponseEntity.ok(accountService.getBalance(idConta));
    }
} 