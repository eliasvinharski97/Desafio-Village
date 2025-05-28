package com.example.demo.repository;

import com.example.demo.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByContaOrigem_IdContaOrContaDestino_IdConta(Long contaOrigemId, Long contaDestinoId);
    List<Transacao> findByContaOrigem_IdContaOrContaDestino_IdContaAndDataTransacaoBetween(Long contaOrigemId, Long contaDestinoId, LocalDateTime start, LocalDateTime end);
} 