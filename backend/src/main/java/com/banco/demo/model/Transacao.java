package com.banco.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transacoes")
public class Transacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTransacao;
    
    @ManyToOne
    @JoinColumn(name = "id_conta", nullable = false)
    private Conta conta;
    
    @NotNull(message = "Valor é obrigatório")
    @Column(nullable = false)
    private BigDecimal valor;
    
    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime dataTransacao = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_operacao", nullable = false)
    private TipoOperacao tipoOperacao;
    
    public enum TipoOperacao {
        DEPOSITO,
        SAQUE
    }
} 