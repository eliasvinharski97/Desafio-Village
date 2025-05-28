-- Criação da tabela pessoa se não existir
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pessoa]') AND type in (N'U'))
BEGIN
    CREATE TABLE pessoa (
        id_pessoa BIGINT IDENTITY(1,1) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(11) NOT NULL UNIQUE,
        data_nascimento DATE NOT NULL
    );
END;

-- Verifica se já existem índices
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_pessoa_cpf' AND object_id = OBJECT_ID(N'[dbo].[pessoa]'))
BEGIN
    CREATE UNIQUE INDEX IX_pessoa_cpf ON pessoa(cpf);
END; 