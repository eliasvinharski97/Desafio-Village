-- Criação da tabela pessoa
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pessoa]') AND type in (N'U'))
BEGIN
    CREATE TABLE pessoa (
        id_pessoa BIGINT IDENTITY(1,1) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(11) NOT NULL UNIQUE,
        data_nascimento DATE NOT NULL
    )
END

-- Inserindo uma pessoa para teste
IF NOT EXISTS (SELECT * FROM pessoa WHERE cpf = '12345678901')
BEGIN
    INSERT INTO pessoa (nome, cpf, data_nascimento) 
    VALUES ('João Silva', '12345678901', '1990-01-01')
END

-- Criação da tabela conta
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[conta]') AND type in (N'U'))
BEGIN
    CREATE TABLE conta (
        id_conta BIGINT IDENTITY(1,1) PRIMARY KEY,
        id_pessoa BIGINT NOT NULL,
        saldo DECIMAL(15,2) NOT NULL,
        limite_saque_diario DECIMAL(15,2) NOT NULL,
        flag_ativo BIT NOT NULL,
        tipo_conta INT NOT NULL,
        data_criacao DATETIME NOT NULL,
        CONSTRAINT FK_conta_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
    )
END

-- Criação da tabela transacao
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[transacao]') AND type in (N'U'))
BEGIN
    CREATE TABLE transacao (
        id_transacao BIGINT IDENTITY(1,1) PRIMARY KEY,
        id_conta BIGINT NOT NULL,
        valor DECIMAL(15,2) NOT NULL,
        data_transacao DATETIME NOT NULL,
        CONSTRAINT FK_transacao_conta FOREIGN KEY (id_conta) REFERENCES conta(id_conta)
    )
END 