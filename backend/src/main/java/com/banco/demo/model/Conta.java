package com.banco.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "contas")
public class Conta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConta;
    
    @ManyToOne
    @JoinColumn(name = "id_pessoa", nullable = false)
    private Pessoa pessoa;
    
    @NotNull(message = "Saldo é obrigatório")
    @Min(value = 0, message = "Saldo não pode ser negativo")
    @Column(nullable = false)
    private BigDecimal saldo;
    
    @NotNull(message = "Limite de saque diário é obrigatório")
    @Min(value = 0, message = "Limite de saque diário deve ser maior que zero")
    @Column(name = "limite_saque_diario", nullable = false)
    private BigDecimal limiteSaqueDiario;
    
    @Column(name = "flag_ativo", nullable = false)
    private boolean flagAtivo = true;
    
    @NotNull(message = "Tipo de conta é obrigatório")
    @Column(name = "tipo_conta", nullable = false)
    private Integer tipoConta;
    
    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();
} 