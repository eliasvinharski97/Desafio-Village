export interface Account {
  idConta?: number;
  pessoa: {
    idPessoa: number;
  };
  saldo: number;
  limiteSaqueDiario: number;
  tipoConta: number;
  flagAtivo: boolean;
  dataCriacao?: string;
}

export interface Transaction {
  id?: number;
  contaOrigem?: Account;
  contaDestino?: Account;
  valor: number;
  dataTransacao: string;
  tipo: 'DEPOSITO' | 'SAQUE' | 'TRANSFERENCIA';
}

export interface Person {
  idPessoa?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export interface AccountStatement {
  conta: Account;
  transacoes: Transaction[];
}

export interface StatementFilter {
  startDate?: Date;
  endDate?: Date;
} 