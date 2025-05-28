package com.example.demo.service;

import com.example.demo.model.Pessoa;
import com.example.demo.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PessoaService {
    private static final Logger logger = LoggerFactory.getLogger(PessoaService.class);

    @Autowired
    private PessoaRepository pessoaRepository;

    @Transactional
    public Pessoa criar(Pessoa pessoa) {
        try {
            logger.info("Iniciando criação de pessoa: {}", pessoa);
            
            // Verifica se já existe pessoa com o mesmo CPF
            if (pessoaRepository.findByCpf(pessoa.getCpf()).isPresent()) {
                logger.error("CPF já cadastrado: {}", pessoa.getCpf());
                throw new IllegalArgumentException("CPF já cadastrado");
            }

            // Validações adicionais
            if (pessoa.getNome() == null || pessoa.getNome().trim().isEmpty()) {
                throw new IllegalArgumentException("Nome é obrigatório");
            }
            if (pessoa.getCpf() == null || !pessoa.getCpf().matches("\\d{11}")) {
                throw new IllegalArgumentException("CPF deve conter 11 dígitos");
            }
            if (pessoa.getDataNascimento() == null) {
                throw new IllegalArgumentException("Data de nascimento é obrigatória");
            }

            logger.info("Salvando pessoa no banco de dados: {}", pessoa);
            Pessoa pessoaSalva = pessoaRepository.save(pessoa);
            logger.info("Pessoa salva com sucesso. ID: {}", pessoaSalva.getIdPessoa());
            return pessoaSalva;
        } catch (Exception e) {
            logger.error("Erro ao criar pessoa: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<Pessoa> listar() {
        return pessoaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Pessoa buscarPorId(Long id) {
        return pessoaRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));
    }

    @Transactional(readOnly = true)
    public Pessoa buscarPorCpf(String cpf) {
        return pessoaRepository.findByCpf(cpf)
            .orElseThrow(() -> new EntityNotFoundException("Pessoa não encontrada"));
    }
} 