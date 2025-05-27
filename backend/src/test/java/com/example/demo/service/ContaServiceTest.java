package com.example.demo.service;

import com.example.demo.model.Conta;
import com.example.demo.model.Pessoa;
import com.example.demo.repository.ContaRepository;
import com.example.demo.repository.TransacaoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ContaServiceTest {

    @Mock
    private ContaRepository contaRepository;

    @Mock
    private TransacaoRepository transacaoRepository;

    @InjectMocks
    private ContaService contaService;

    private Conta conta;
    private Pessoa pessoa;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        pessoa = new Pessoa();
        pessoa.setIdPessoa(1L);

        conta = new Conta();
        conta.setIdConta(1L);
        conta.setPessoa(pessoa);
        conta.setSaldo(new BigDecimal("1000.00"));
        conta.setLimiteSaqueDiario(new BigDecimal("1000.00"));
        conta.setFlagAtivo(true);
        conta.setTipoConta(1);
        conta.setDataCriacao(LocalDateTime.now());
    }

    @Test
    void deveRealizarDeposito() {
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenReturn(conta);

        BigDecimal valorDeposito = new BigDecimal("500.00");
        contaService.realizarDeposito(1L, valorDeposito);

        assertEquals(new BigDecimal("1500.00"), conta.getSaldo());
        verify(transacaoRepository, times(1)).save(any());
    }

    @Test
    void deveRealizarSaque() {
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenReturn(conta);

        BigDecimal valorSaque = new BigDecimal("500.00");
        contaService.realizarSaque(1L, valorSaque);

        assertEquals(new BigDecimal("500.00"), conta.getSaldo());
        verify(transacaoRepository, times(1)).save(any());
    }

    @Test
    void deveFalharSaqueContaBloqueada() {
        conta.setFlagAtivo(false);
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));

        BigDecimal valorSaque = new BigDecimal("500.00");
        
        assertThrows(IllegalStateException.class, () -> {
            contaService.realizarSaque(1L, valorSaque);
        });

        verify(transacaoRepository, never()).save(any());
    }

    @Test
    void deveFalharSaqueSaldoInsuficiente() {
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));

        BigDecimal valorSaque = new BigDecimal("2000.00");
        
        assertThrows(IllegalStateException.class, () -> {
            contaService.realizarSaque(1L, valorSaque);
        });

        verify(transacaoRepository, never()).save(any());
    }

    @Test
    void deveBloquearConta() {
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenReturn(conta);

        contaService.toggleBloqueio(1L);

        assertFalse(conta.getFlagAtivo());
    }

    @Test
    void deveDesbloquearConta() {
        conta.setFlagAtivo(false);
        when(contaRepository.findById(1L)).thenReturn(Optional.of(conta));
        when(contaRepository.save(any(Conta.class))).thenReturn(conta);

        contaService.toggleBloqueio(1L);

        assertTrue(conta.getFlagAtivo());
    }
} 