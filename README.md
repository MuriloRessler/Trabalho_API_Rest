# 🚀 API Loja — REST API (MySQL)

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/Docs-Swagger-brightgreen)

API RESTful desenvolvida com **Node.js**, **Express** e **MySQL** para gerenciamento de uma loja (categorias, produtos, clientes e pedidos), utilizando autenticação via **JWT**, proteção contra **SQL Injection** com Prepared Statements, e documentação interativa com **Swagger**.

> 📌 **Migração de versão:** este projeto era originalmente baseado em MongoDB/Mongoose (v1.0.0). A v2.0.0 migrou toda a camada de persistência para MySQL, seguindo o padrão MVC, e expandiu o escopo para os módulos de Categorias, Produtos, Clientes e Pedidos.

---

## 📖 Sobre o Projeto

O sistema permite que usuários se registrem e façam login para acessar as áreas protegidas de gerenciamento da loja. As entidades disponíveis são:

* **Categorias** — `id_categoria`, `nome`
* **Produtos** — `id_produto`, `nome`, `valor`, `estoque`, vinculado a uma categoria
* **Clientes** — `id_cliente`, `nome`, `telefone`, `status` (bom/medio/ruim)
* **Pedidos** — `id_pedido`, `data`, vinculado a um cliente, com itens (`produtos_pedidos`)

Todas as rotas de CRUD (exceto a de status/versão) exigem autenticação JWT **e** validação do ID do usuário presente no token.

---

## 🛠️ Tecnologias Utilizadas

### Back-end
* Node.js
* Express.js

### Banco de Dados
* MySQL
* mysql2 (driver com suporte a Promises/async-await)

### Segurança
* JWT (JSON Web Token)
* bcryptjs (hash de senhas)
* Prepared Statements (`?`) em todas as queries SQL

### Documentação
* Swagger UI

### Utilitários
* dotenv
* nodemon

---

## 📂 Estrutura do Projeto

```text
├── server.js
├── loja.sql                      <-- Script do banco (inclui tabela `usuarios`)
├── .env                          <-- Credenciais (não commitar)
│
└── src/
    ├── config/
    │   └── database.js           <-- Pool de conexões MySQL
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── categoriaController.js
    │   ├── produtoController.js
    │   ├── clienteController.js
    │   └── pedidoController.js
    │
    ├── middleware/
    │   └── auth.js               <-- Valida JWT + exige ID do usuário no payload
    │
    ├── models/
    │   ├── usuarioModel.js
    │   ├── categoriaModel.js
    │   ├── produtoModel.js
    │   ├── clienteModel.js
    │   └── pedidoModel.js
    │
    ├── routes/
    │   ├── apiRoutes.js          <-- GET /api/status (público)
    │   ├── authRoutes.js
    │   ├── categoriaRoutes.js
    │   ├── produtosRoutes.js
    │   ├── clientesRoutes.js
    │   └── pedidosRoutes.js
    │
    └── swagger/
        └── swagger.js
```

---

## ✨ Funcionalidades

### Usuários
- [x] Cadastro de usuários
- [x] Login com JWT
- [x] Senhas armazenadas como hash bcrypt (nunca em texto puro)

### Categorias 🔒
- [x] Criar, listar, buscar por ID, atualizar e excluir

### Produtos 🔒
- [x] CRUD completo
- [x] Validação: categoria vinculada precisa existir

### Clientes 🔒
- [x] CRUD completo
- [x] Campo `status` restrito a `bom`, `medio` ou `ruim`

### Pedidos 🔒
- [x] CRUD completo
- [x] Criação com itens (`produtos_pedidos`) em **transação** (tudo ou nada)
- [x] Validação: cliente e produtos vinculados precisam existir

### Monitoramento
- [x] Rota pública `GET /api/status` (sem autenticação)

### Segurança
- [x] Rotas de CRUD protegidas por JWT + verificação de ID do usuário no token
- [x] Proteção contra SQL Injection via Prepared Statements
- [x] Bloqueio com 401/403 em qualquer tentativa de acesso sem token válido

### Documentação
- [x] Swagger UI integrado, com todos os módulos documentados
- [x] Suporte a autenticação Bearer direto na interface (botão Authorize)

---

## 📦 Instalação

### Pré-requisitos
* Git
* Node.js 18+
* MySQL Server (local ou remoto)

### 1. Clone o repositório
```bash
git clone https://github.com/MuriloRessler/Trabalho_API_Rest
```

### 2. Acesse a pasta
```bash
cd TRABALHO_API_REST
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Crie o banco de dados
Importe o script `loja.sql` no seu servidor MySQL (cria as tabelas `categorias`, `clientes`, `endereco`, `pedidos`, `produtos`, `produtos_pedidos` e `usuarios`):

```bash
mysql -u root -p < loja.sql
```

---

## 🔑 Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base):

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=loja

JWT_SECRET=sua_chave_secreta
```

> ⚠️ O `.env` nunca deve ser commitado — ele já está listado no `.gitignore`.

---

## 🚀 Executando a Aplicação

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

Servidor disponível em:
```text
http://localhost:3000
```

Ao iniciar, o terminal confirma a conexão com o MySQL:
```text
✅ MySQL conectado com sucesso!
🚀 Servidor rodando na porta 3000
```

---

## 📖 Documentação Swagger

Após iniciar o servidor, acesse:
```text
http://localhost:3000/api-docs
```

A documentação permite:
* Visualizar todos os endpoints, organizados por módulo (Categorias 🔒, Produtos 🔒, Clientes 🔒, Pedidos 🔒)
* Testar requisições diretamente pelo navegador
* Informar o token JWT pelo botão **Authorize** (formato `Bearer <token>`)
* Ver exemplos de request e response de cada rota

---

## 🔐 Autenticação

### Registrar Usuário
```http
POST /api/auth/register
```
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Login
```http
POST /api/auth/login
```
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta:
```json
{
  "token": "jwt_token",
  "usuario": { "id": 1, "nome": "João Silva", "email": "joao@email.com" }
}
```

Use o token em todas as rotas protegidas:
```http
Authorization: Bearer jwt_token
```

---

## 🟢 Rota Pública

| Método | Endpoint      | Descrição                          |
| ------ | ------------- | ----------------------------------- |
| GET    | /api/status   | Status e versão da API (sem login) |
| GET    | /api/versao   | Alias de /api/status               |

---

## 📋 Endpoints

### Autenticação
| Método | Endpoint            |
| ------ | -------------------- |
| POST   | /api/auth/register   |
| POST   | /api/auth/login      |

### Categorias 🔒 (JWT obrigatório)
| Método | Endpoint              | Descrição              |
| ------ | ---------------------- | ----------------------- |
| GET    | /api/categorias        | Listar categorias       |
| GET    | /api/categorias/:id    | Buscar categoria        |
| POST   | /api/categorias        | Criar categoria         |
| PUT    | /api/categorias/:id    | Atualizar categoria     |
| DELETE | /api/categorias/:id    | Excluir categoria       |

### Produtos 🔒 (JWT obrigatório)
| Método | Endpoint            | Descrição           |
| ------ | -------------------- | --------------------- |
| GET    | /api/produtos         | Listar produtos       |
| GET    | /api/produtos/:id     | Buscar produto        |
| POST   | /api/produtos         | Criar produto         |
| PUT    | /api/produtos/:id     | Atualizar produto     |
| DELETE | /api/produtos/:id     | Excluir produto       |

### Clientes 🔒 (JWT obrigatório)
| Método | Endpoint            | Descrição           |
| ------ | -------------------- | --------------------- |
| GET    | /api/clientes         | Listar clientes       |
| GET    | /api/clientes/:id     | Buscar cliente        |
| POST   | /api/clientes         | Criar cliente         |
| PUT    | /api/clientes/:id     | Atualizar cliente     |
| DELETE | /api/clientes/:id     | Excluir cliente       |

### Pedidos 🔒 (JWT obrigatório)
| Método | Endpoint           | Descrição                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | /api/pedidos         | Listar pedidos                      |
| GET    | /api/pedidos/:id     | Buscar pedido (com itens)           |
| POST   | /api/pedidos         | Criar pedido + itens (transação)    |
| PUT    | /api/pedidos/:id     | Atualizar data/cliente do pedido    |
| DELETE | /api/pedidos/:id     | Excluir pedido (e seus itens)       |

---

## 🧪 Exemplos de Payload

### Criar Categoria
```json
{ "nome": "Eletrônicos" }
```

### Criar Produto
```json
{
  "nome": "Notebook Dell",
  "valor": 3500.00,
  "estoque": 10,
  "categorias_id_categoria": 1
}
```

### Criar Cliente
```json
{
  "nome": "Maria Souza",
  "telefone": "51999998888",
  "status": "bom"
}
```

### Criar Pedido (com itens)
```json
{
  "data": "2026-06-22",
  "clientes_id_cliente": 1,
  "itens": [
    { "produtos_id_produto": 1, "quantidade": 2, "valor": 3500.00 }
  ]
}
```

---

## 🛡️ Segurança Implementada

### JWT + Validação de ID do usuário
Todas as rotas de CRUD (Categorias, Produtos, Clientes, Pedidos) exigem:
1. Token JWT válido no header `Authorization: Bearer <token>`
2. O payload do token deve conter o `id` do usuário

Qualquer requisição que não atenda às duas condições recebe **401 Unauthorized** ou **403 Forbidden**.

```http
Authorization: Bearer seu_token_jwt
```

### Proteção contra SQL Injection
Todas as queries usam **Prepared Statements** com `mysql2`:

```javascript
pool.execute('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
```

Nenhum valor de entrada do usuário é concatenado diretamente em uma query SQL.

### Senhas
Senhas de usuário são hasheadas com `bcryptjs` (salt rounds = 12) antes de serem persistidas — nunca armazenadas em texto puro.

### Integridade Referencial
Produtos, pedidos e itens de pedido validam a existência das entidades relacionadas (categoria, cliente, produto) antes de gravar no banco, além de contarem com as Foreign Keys definidas no próprio schema MySQL.

---

## 🎯 Objetivos Acadêmicos

Este projeto foi desenvolvido para praticar:
* Migração de persistência NoSQL → SQL Relacional
* Padrão MVC (Model-View-Controller)
* Node.js e Express
* MySQL e mysql2 com Promises/async-await
* Prepared Statements e prevenção de SQL Injection
* JWT e autenticação adaptada a um SGBD relacional
* Transações SQL (commit/rollback)
* Documentação de API com Swagger

---

## 👨‍💻 Autor

**Murilo Ressler Garcez**

Projeto desenvolvido para fins acadêmicos na disciplina de desenvolvimento back-end.

GitHub: https://github.com/MuriloRessler

---

## 📄 Licença

Este projeto possui finalidade exclusivamente educacional.
