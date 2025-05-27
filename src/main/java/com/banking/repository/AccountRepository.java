package com.banking.repository;

import com.banking.domain.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByIdPessoa(Long idPessoa);
    Optional<Account> findByIdContaAndFlagAtivoTrue(Long idConta);
} 