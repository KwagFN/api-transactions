# API Transactions

Este projeto é uma API de gerenciamento de transações financeiras, permitindo que os usuários realizem operações como criar transações, obter um resumo financeiro e listar ou visualizar transações específicas. A API foi desenvolvida utilizando **Node.js** e **TypeScript**, com integração de banco de dados **SQLite** para persistência de dados.

## Funcionalidades

### Requisitos Funcionais (RF)
- [x] Criar uma nova transação (crédito ou débito)
- [x] Obter um resumo do saldo do usuário
- [x] Listar todas as transações do usuário
- [x] Visualizar detalhes de uma transação específica

### Regras de Negócio (RN)
- [x] As transações podem ser de dois tipos: **crédito** (adiciona ao saldo) ou **débito** (subtrai do saldo)
- [x] Apenas o usuário que criou a transação pode visualizá-la
- [x] O saldo é atualizado automaticamente após cada transação

## Instalação

Siga os passos abaixo para rodar a aplicação localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/KwagFN/api-transactions.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm run start:dev
   ```

## Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Fastify** para gerenciamento de rotas HTTP
- **Zod** para validação de dados
- **Knex** como QueryBuilder
