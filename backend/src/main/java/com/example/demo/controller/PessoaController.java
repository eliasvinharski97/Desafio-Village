package com.example.demo.controller;

import com.example.demo.model.Pessoa;
import com.example.demo.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
public class PessoaController {
    private static final Logger logger = LoggerFactory.getLogger(PessoaController.class);

    @Autowired
    private PessoaService pessoaService;

    @PostConstruct
    public void init() {
        logger.info("PessoaController initialized. Mapped to /api/pessoas");
    }

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Pessoa pessoa) {
        try {
            logger.info("POST request received on /api/pessoas with data: {}", pessoa);
            Pessoa pessoaCriada = pessoaService.criar(pessoa);
            logger.info("Pessoa criada com sucesso: {}", pessoaCriada);
            return ResponseEntity.ok(pessoaCriada);
        } catch (Exception e) {
            logger.error("Erro ao cadastrar pessoa: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro ao cadastrar pessoa: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> listar() {
        logger.info("GET request received on /api/pessoas");
        return ResponseEntity.ok(pessoaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pessoaService.buscarPorId(id));
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<Pessoa> buscarPorCpf(@PathVariable String cpf) {
        return ResponseEntity.ok(pessoaService.buscarPorCpf(cpf));
    }

    @GetMapping("/{id}/validar")
    public ResponseEntity<Boolean> validarPessoa(@PathVariable Long id) {
        try {
            pessoaService.buscarPorId(id);
            return ResponseEntity.ok(true);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.ok(false);
        }
    }
} 