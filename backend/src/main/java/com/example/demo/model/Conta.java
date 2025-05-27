package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "conta")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conta")
    private Long idConta;

    @ManyToOne
    @JoinColumn(name = "id_pessoa", nullable = false)
    private Pessoa pessoa;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name = "limite_saque_diario", nullable = false)
    private BigDecimal limiteSaqueDiario;

    @Column(name = "flag_ativo", nullable = false)
    private Boolean flagAtivo;

    @Column(name = "tipo_conta", nullable = false)
    private Integer tipoConta;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    private boolean bloqueada = false;
} 