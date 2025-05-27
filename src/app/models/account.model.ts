export interface Account {
    idConta?: number;
    idPessoa: number;
    saldo: number;
    limiteSaqueDiario: number;
    flagAtivo: boolean;
    tipoConta: number;
    dataCriacao?: Date;
}

export interface AccountOperation {
    valor: number;
} 