# help-desk-sys
Sistema HelpDesk Node.js + React

# Help Desk / Ticket System

Sistema de chamados (Help Desk) desenvolvido para estudo e portfólio, utilizando uma arquitetura full stack com Node.js, React e PostgreSQL.

O objetivo do projeto é simular um sistema real de suporte técnico, permitindo abertura, gerenciamento e acompanhamento de tickets/chamados.

---

# 🚀 Tecnologias

## Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt

## Frontend
- React
- Vite
- Axios
- React Router DOM

## Banco de Dados
- PostgreSQL

---

# 🎯 Objetivos do Projeto

- Aprender desenvolvimento full stack
- Praticar criação de APIs REST
- Trabalhar com autenticação JWT
- Utilizar PostgreSQL em um projeto real
- Aprender integração entre frontend e backend
- Criar um projeto profissional para GitHub/portfólio

---

# 📚 Funcionalidades

## Usuários
- Cadastro de usuários
- Login com autenticação JWT
- Controle de sessão

## Tickets
- Criar chamado
- Listar chamados
- Atualizar status
- Editar prioridade
- Adicionar comentários
- Filtrar tickets

## Dashboard
- Quantidade de tickets abertos
- Tickets finalizados
- Tickets por prioridade

---

# 🏗️ Estrutura do Projeto

```bash
help-desk-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
