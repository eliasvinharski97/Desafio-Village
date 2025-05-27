package com.example.demo.service;

import com.example.demo.model.Conta;
import com.example.demo.model.Transacao;
import com.example.demo.repository.ContaRepository;
import com.example.demo.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ContaService {

    private final ContaRepository contaRepository;
    private final TransacaoRepository transacaoRepository;

    @Autowired
    public ContaService(ContaRepository contaRepository, TransacaoRepository transacaoRepository) {
        this.contaRepository = contaRepository;
        this.transacaoRepository = transacaoRepository;
    }

    public List<Conta> listarTodasContas() {
        return contaRepository.findAll();
    }

    public Optional<Conta> buscarContaPorId(Long id) {
        return contaRepository.findById(id);
    }

    public Conta salvarConta(Conta conta) {
        return contaRepository.save(conta);
    }

    public void deletarConta(Long id) {
        contaRepository.deleteById(id);
    }

    @Transactional
    public Conta realizarDeposito(long contaId, BigDecimal valor) {
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(() -> new IllegalStateException("Conta não encontrada"));

        if (!conta.getFlagAtivo()) {
            throw new IllegalStateException("Conta bloqueada");
        }

        conta.setSaldo(conta.getSaldo().add(valor));
        
        Transacao transacao = new Transacao();
        transacao.setContaDestino(conta);
        transacao.setValor(valor);
        transacao.setTipo(Transacao.TipoTransacao.DEPOSITO);
        
        transacaoRepository.save(transacao);
        return contaRepository.save(conta);
    }

    @Transactional
    public Conta realizarSaque(long contaId, BigDecimal valor) {
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(() -> new IllegalStateException("Conta não encontrada"));

        if (!conta.getFlagAtivo()) {
            throw new IllegalStateException("Conta bloqueada");
        }

        if (conta.getSaldo().compareTo(valor) < 0) {
            throw new IllegalStateException("Saldo insuficiente");
        }

        conta.setSaldo(conta.getSaldo().subtract(valor));
        
        Transacao transacao = new Transacao();
        transacao.setContaOrigem(conta);
        transacao.setValor(valor);
        transacao.setTipo(Transacao.TipoTransacao.SAQUE);
        
        transacaoRepository.save(transacao);
        return contaRepository.save(conta);
    }

    @Transactional
    public void realizarTransferencia(long contaOrigemId, long contaDestinoId, BigDecimal valor) {
        Conta contaOrigem = contaRepository.findById(contaOrigemId)
                .orElseThrow(() -> new IllegalStateException("Conta de origem não encontrada"));
        
        Conta contaDestino = contaRepository.findById(contaDestinoId)
                .orElseThrow(() -> new IllegalStateException("Conta de destino não encontrada"));

        if (!contaOrigem.getFlagAtivo() || !contaDestino.getFlagAtivo()) {
            throw new IllegalStateException("Uma das contas está bloqueada");
        }

        realizarSaque(contaOrigemId, valor);
        realizarDeposito(contaDestinoId, valor);
        
        Transacao transacao = new Transacao();
        transacao.setContaOrigem(contaOrigem);
        transacao.setContaDestino(contaDestino);
        transacao.setValor(valor);
        transacao.setTipo(Transacao.TipoTransacao.TRANSFERENCIA);
        
        transacaoRepository.save(transacao);
    }

    @Transactional
    public Conta toggleBloqueio(long contaId) {
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(() -> new IllegalStateException("Conta não encontrada"));
        
        conta.setFlagAtivo(!conta.getFlagAtivo());
        return contaRepository.save(conta);
    }
} 