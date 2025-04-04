
# 📚 API de Livros

Uma API RESTful para gerenciamento de livros, autores, gêneros e usuários, desenvolvida com **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, **Knex** e autenticação via **JWT**.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **Express** – servidor web  
- **TypeScript** – tipagem estática  
- **Knex.js** – query builder para o PostgreSQL  
- **PostgreSQL** – banco de dados relacional  
- **JWT (JSON Web Token)** – autenticação  
- **Yup** – validação de dados  
- **Jest** – testes automatizados   

---

## 🚀 Funcionalidades

- Cadastro e autenticação de usuários  
- Listagem, criação, atualização e remoção de livros  
- Associação de livros com autores e gêneros  
- Validação de dados com Yup  
- Criptografia de senhas com Bcrypt  
- Testes automatizados com Jest e Supertest  

---

## 🐘 Banco de Dados

- Em desenvolvimento: **SQLite**  
- Em produção: **PostgreSQL**  
- Gerenciado com **Knex.js**

---

## 📚 Rotas da API

Todas as rotas estão sob o prefixo base:  
```
https://api-books-i9s6.onrender.com/
```

### 👤 Usuários

| Método | Rota              | Descrição                          |
|--------|-------------------|------------------------------------|
| POST   | `/entrar`          | Realiza login e retorna token JWT |
| POST   | `/cadastrar`       | Cadastra um novo usuário          |

---

### 📖 Livros

| Método | Rota       | Descrição                        |
|--------|------------|----------------------------------|
| GET    | `/livros`  | Lista todos os livros            |
| GET    | `/livros/:id` | Detalha um livro específico     |
| POST   | `/livros`  | Cadastra um novo livro           |
| PUT    | `/livros/:id` | Atualiza os dados de um livro   |
| DELETE | `/livros/:id` | Remove um livro                 |

> 🔐 Requer autenticação com token JWT

---

### 🧑‍💼 Autores

| Método | Rota        | Descrição                      |
|--------|-------------|--------------------------------|
| GET    | `/autor`  | Lista todos os autores         |
| GET    | `/autor/:id` | Detalha um autor específico    |
| POST   | `/autor`  | Cadastra um novo autor         |

> 🔐 Requer autenticação com token JWT

---

### 🏷️ Gêneros

| Método | Rota        | Descrição                      |
|--------|-------------|--------------------------------|
| GET    | `/genero`  | Lista todos os gêneros         |
| GET    | `/genero/:id` | Detalha um gênero específico   |

> 🔐 Requer autenticação com token JWT

---

## ✨ Feito por

**Giovana de Assis**

---
