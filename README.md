# Sistema Bancário

Sistema de gerenciamento de contas bancárias desenvolvido com Spring Boot (backend) e Angular (frontend).

## Funcionalidades

- Criação de contas
- Depósito em conta
- Saque em conta
- Consulta de saldo
- Bloqueio/desbloqueio de conta
- Extrato de transações
- Filtro de extrato por período

## Requisitos

- Java 17+
- Node.js 18+
- Maven 3.8+
- MySQL 8+

## Configuração do Ambiente

### Backend

1. Clone o repositório
2. Configure o banco de dados MySQL no arquivo `application.properties`
3. Execute o backend:

```bash
cd backend
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### Frontend

1. Instale as dependências:

```bash
cd frontend
npm install
```

2. Execute o frontend:

```bash
npm start
```

O frontend estará disponível em `http://localhost:4201`

## Estrutura do Projeto

### Backend

- `src/main/java/com/banco/demo/`
  - `controller/` - Controladores REST
  - `service/` - Regras de negócio
  - `model/` - Entidades e DTOs
  - `repository/` - Acesso ao banco de dados
  - `exception/` - Tratamento de exceções

### Frontend

- `src/app/`
  - `components/` - Componentes Angular
  - `services/` - Serviços de comunicação com API
  - `models/` - Interfaces e tipos
  - `environments/` - Configurações de ambiente

## API Endpoints

### Contas

- `POST /api/contas` - Criar conta
- `GET /api/contas/{id}` - Buscar conta
- `POST /api/contas/{id}/deposito` - Realizar depósito
- `POST /api/contas/{id}/saque` - Realizar saque
- `POST /api/contas/{id}/bloqueio` - Bloquear/desbloquear conta
- `GET /api/contas/{id}/extrato` - Buscar extrato
  - Query params: `dataInicio`, `dataFim`

## Testes

### Backend

Execute os testes unitários:

```bash
cd backend
mvn test
```

### Frontend

Execute os testes unitários:

```bash
cd frontend
npm test
```

## Documentação Adicional

- [Swagger UI](http://localhost:8080/swagger-ui.html) - Documentação da API
- [JavaDoc](./backend/docs) - Documentação do código Java
- [Compodoc](./frontend/documentation) - Documentação do código Angular 