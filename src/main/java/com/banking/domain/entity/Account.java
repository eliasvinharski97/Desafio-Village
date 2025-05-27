package com.banking.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConta;

    @NotNull
    private Long idPessoa;

    @NotNull
    @PositiveOrZero
    @Column(precision = 19, scale = 2)
    private BigDecimal saldo;

    @NotNull
    @PositiveOrZero
    @Column(precision = 19, scale = 2)
    private BigDecimal limiteSaqueDiario;

    @NotNull
    private Boolean flagAtivo;

    @NotNull
    private Integer tipoConta;

    @NotNull
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }
} 