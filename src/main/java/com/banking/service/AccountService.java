package com.banking.service;

import com.banking.domain.dto.AccountDTO;
import com.banking.domain.entity.Account;
import com.banking.repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public AccountDTO createAccount(AccountDTO accountDTO) {
        Account account = Account.builder()
                .idPessoa(accountDTO.getIdPessoa())
                .saldo(accountDTO.getSaldo())
                .limiteSaqueDiario(accountDTO.getLimiteSaqueDiario())
                .flagAtivo(accountDTO.getFlagAtivo())
                .tipoConta(accountDTO.getTipoConta())
                .build();

        Account savedAccount = accountRepository.save(account);
        return convertToDTO(savedAccount);
    }

    @Transactional(readOnly = true)
    public AccountDTO getAccount(Long idConta) {
        Account account = findActiveAccount(idConta);
        return convertToDTO(account);
    }

    @Transactional
    public AccountDTO deposit(Long idConta, BigDecimal valor) {
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor do depósito deve ser maior que zero");
        }

        Account account = findActiveAccount(idConta);
        account.setSaldo(account.getSaldo().add(valor));
        
        Account updatedAccount = accountRepository.save(account);
        return convertToDTO(updatedAccount);
    }

    @Transactional
    public AccountDTO withdraw(Long idConta, BigDecimal valor) {
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor do saque deve ser maior que zero");
        }

        Account account = findActiveAccount(idConta);

        if (valor.compareTo(account.getLimiteSaqueDiario()) > 0) {
            throw new IllegalArgumentException("Valor excede o limite de saque diário");
        }

        if (valor.compareTo(account.getSaldo()) > 0) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        account.setSaldo(account.getSaldo().subtract(valor));
        Account updatedAccount = accountRepository.save(account);
        return convertToDTO(updatedAccount);
    }

    @Transactional
    public AccountDTO blockAccount(Long idConta) {
        Account account = findActiveAccount(idConta);
        account.setFlagAtivo(false);
        Account updatedAccount = accountRepository.save(account);
        return convertToDTO(updatedAccount);
    }

    @Transactional(readOnly = true)
    public BigDecimal getBalance(Long idConta) {
        Account account = findActiveAccount(idConta);
        return account.getSaldo();
    }

    private Account findActiveAccount(Long idConta) {
        return accountRepository.findByIdContaAndFlagAtivoTrue(idConta)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada ou inativa"));
    }

    private AccountDTO convertToDTO(Account account) {
        return AccountDTO.builder()
                .idConta(account.getIdConta())
                .idPessoa(account.getIdPessoa())
                .saldo(account.getSaldo())
                .limiteSaqueDiario(account.getLimiteSaqueDiario())
                .flagAtivo(account.getFlagAtivo())
                .tipoConta(account.getTipoConta())
                .dataCriacao(account.getDataCriacao())
                .build();
    }
} 