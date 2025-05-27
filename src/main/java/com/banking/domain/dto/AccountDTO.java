package com.banking.domain.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Long idConta;
    
    @NotNull(message = "ID da pessoa é obrigatório")
    private Long idPessoa;
    
    @NotNull(message = "Saldo é obrigatório")
    @PositiveOrZero(message = "Saldo não pode ser negativo")
    private BigDecimal saldo;
    
    @NotNull(message = "Limite de saque diário é obrigatório")
    @PositiveOrZero(message = "Limite de saque diário não pode ser negativo")
    private BigDecimal limiteSaqueDiario;
    
    @NotNull(message = "Status da conta é obrigatório")
    private Boolean flagAtivo;
    
    @NotNull(message = "Tipo de conta é obrigatório")
    private Integer tipoConta;
    
    private LocalDateTime dataCriacao;
} 