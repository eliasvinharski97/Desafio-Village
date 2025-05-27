package com.example.demo.controller;

import com.example.demo.model.Conta;
import com.example.demo.model.Pessoa;
import com.example.demo.service.ContaService;
import com.example.demo.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;

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
} 