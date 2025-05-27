package com.example.demo.service;

import com.example.demo.model.Pessoa;
import com.example.demo.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Transactional
    public Pessoa criar(Pessoa pessoa) {
        // Verifica se já existe pessoa com o mesmo CPF
        if (pessoaRepository.findByCpf(pessoa.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        return pessoaRepository.save(pessoa);
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