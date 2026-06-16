# 🚀 Trabalho_API - Catálogo de Produtos REST API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/Docs-Swagger-brightgreen)

API RESTful desenvolvida com **Node.js**, **Express** e **MongoDB** para gerenciamento de produtos, utilizando autenticação via **JWT**, proteção contra **NoSQL Injection** e documentação interativa com **Swagger**.

---

## 📖 Sobre o Projeto

O sistema permite que usuários se registrem e realizem login para acessar uma área protegida de gerenciamento de produtos.

Cada produto possui informações como:

* Nome
* Descrição
* Preço
* Categoria
* Estoque
* Atributos personalizados

A API segue os princípios REST e utiliza autenticação baseada em tokens JWT para proteger os endpoints de produtos.

---

## 🛠️ Tecnologias Utilizadas

### Back-end

* Node.js
* Express.js

### Banco de Dados

* MongoDB
* Mongoose

### Segurança

* JWT (JSON Web Token)
* bcryptjs
* express-mongo-sanitize

### Documentação

* Swagger UI

### Utilitários

* dotenv
* nodemon

---

## 📂 Estrutura do Projeto

```text
src/
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   └── productController.js
│
├── middleware/
│   ├── auth.js
│   └── santize.js
│
├── models/
│   ├── User.js
│   └── Product.js
│
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
│
├── swagger/
│   └── swagger.js
│
server.js
```

---

## ✨ Funcionalidades

### Usuários

* [x] Cadastro de usuários
* [x] Login com JWT
* [x] Criptografia de senhas com bcrypt

### Produtos

* [x] Criar produto
* [x] Listar produtos
* [x] Buscar produto por ID
* [x] Atualizar produto
* [x] Excluir produto

### Segurança

* [x] Rotas protegidas por JWT
* [x] Proteção contra NoSQL Injection
* [x] Senhas armazenadas de forma criptografada

### Documentação

* [x] Swagger UI integrado
* [x] Teste de endpoints diretamente pelo navegador

---

## 📦 Instalação

### Pré-requisitos

* Git
* Node.js 18+
* MongoDB Atlas ou MongoDB Local

---

### 1. Clone o repositório

```bash
git clone https://github.com/MuriloRessler/Trabalho_API
```

### 2. Acesse a pasta

```bash
cd Trabalho_API
```

### 3. Instale as dependências

```bash
npm install
```

---

## 🔑 Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/database

JWT_SECRET=sua_chave_secreta

JWT_EXPIRES_IN=7d
```

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

---

## 📖 Documentação Swagger

Após iniciar o servidor, acesse:

```text
http://localhost:3000/api-docs
```

A documentação permite:

* Visualizar todos os endpoints
* Testar requisições
* Informar token JWT diretamente pela interface
* Ver exemplos de request e response

---

## 🔐 Autenticação

### Registrar Usuário

```http
POST /api/auth/register
```

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt_token"
}
```

---

## 📋 Endpoints

### Autenticação

| Método | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

### Produtos (JWT Obrigatório)

| Método | Endpoint          | Descrição         |
| ------ | ----------------- | ----------------- |
| POST   | /api/products     | Criar produto     |
| GET    | /api/products     | Listar produtos   |
| GET    | /api/products/:id | Buscar produto    |
| PUT    | /api/products/:id | Atualizar produto |
| DELETE | /api/products/:id | Excluir produto   |

---

## 🧪 Exemplo de Produto

```json
{
  "name": "Notebook Gamer",
  "description": "Notebook com placa de vídeo dedicada",
  "price": 4999.99,
  "category": "eletronicos",
  "stock": 10,
  "attributes": {
    "ram": "16GB",
    "processador": "Intel i7"
  }
}
```

---

## 🛡️ Segurança Implementada

### JWT

Todas as rotas de produtos exigem autenticação.

Exemplo:

```http
Authorization: Bearer seu_token_jwt
```

### Proteção contra NoSQL Injection

A aplicação utiliza:

```javascript
express-mongo-sanitize
```

para impedir manipulações maliciosas em consultas MongoDB.

---

## 🎯 Objetivos Acadêmicos

Este projeto foi desenvolvido para praticar:

* Desenvolvimento de APIs REST
* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Segurança em APIs
* Middleware
* Documentação com Swagger

---

## 👨‍💻 Autor

**Murilo Ressler Garcez**

Projeto desenvolvido para fins acadêmicos na disciplina de desenvolvimento back-end.

GitHub:
https://github.com/MuriloRessler

---

## 📄 Licença

Este projeto possui finalidade exclusivamente educacional.

