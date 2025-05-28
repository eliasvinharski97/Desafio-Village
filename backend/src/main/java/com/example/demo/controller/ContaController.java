package com.example.demo.controller;

import com.example.demo.model.Conta;
import com.example.demo.model.Pessoa;
import com.example.demo.service.ContaService;
import com.example.demo.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "http://localhost:4200")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Conta> criar(@Valid @RequestBody Conta conta) {
        try {
            // Busca a pessoa pelo ID
            Pessoa pessoa = pessoaService.buscarPorId(conta.getPessoa().getIdPessoa());
            
            // Configura a conta com os dados necessários
            conta.setPessoa(pessoa);
            conta.setDataCriacao(LocalDateTime.now());
            
            // Salva a conta
            Conta contaCriada = contaService.salvarConta(conta);
            return ResponseEntity.ok(contaCriada);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar conta: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/deposito")
    public ResponseEntity<?> depositar(@PathVariable Long id, @RequestParam BigDecimal valor) {
        try {
            Conta conta = contaService.realizarDeposito(id, valor);
            return ResponseEntity.ok(conta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/saque")
    public ResponseEntity<?> sacar(@PathVariable Long id, @RequestParam BigDecimal valor) {
        try {
            Conta conta = contaService.realizarSaque(id, valor);
            return ResponseEntity.ok(conta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/saldo")
    public ResponseEntity<?> consultarSaldo(@PathVariable Long id) {
        return contaService.buscarContaPorId(id)
                .map(conta -> ResponseEntity.ok(conta.getSaldo()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/bloquear")
    public ResponseEntity<?> bloquearOuDesbloquear(@PathVariable Long id) {
        try {
            Conta conta = contaService.toggleBloqueio(id);
            return ResponseEntity.ok(conta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Autowired
    private com.example.demo.repository.TransacaoRepository transacaoRepository;

    @GetMapping("/{id}/extrato")
    public ResponseEntity<?> extrato(
            @PathVariable Long id,
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim) {
        try {
            List<com.example.demo.model.Transacao> transacoes;
            if (dataInicio != null && dataFim != null) {
                LocalDateTime inicio = LocalDateTime.parse(dataInicio);
                LocalDateTime fim = LocalDateTime.parse(dataFim);
                transacoes = transacaoRepository.findByContaOrigem_IdContaOrContaDestino_IdContaAndDataTransacaoBetween(id, id, inicio, fim);
            } else {
                transacoes = transacaoRepository.findByContaOrigem_IdContaOrContaDestino_IdConta(id, id);
            }
            return ResponseEntity.ok(transacoes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 