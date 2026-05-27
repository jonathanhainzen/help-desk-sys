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


🧠 Conceitos Praticados
REST API
CRUD completo
Relacionamentos SQL
Middlewares
Autenticação e autorização
Hash de senha
Organização de projeto
Consumo de API no React
Componentização
Gerenciamento de estado
⚙️ Instalação
Clone o repositório
git clone https://github.com/SEU-USUARIO/help-desk-system.git
🔧 Backend
Acesse a pasta backend
cd backend
Instale as dependências
npm install
Configure o arquivo .env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/helpdesk"
JWT_SECRET="secret"
Execute as migrations
npx prisma migrate dev
Inicie o servidor
npm run dev

Servidor backend:

http://localhost:3000
💻 Frontend
Acesse a pasta frontend
cd frontend
Instale as dependências
npm install
Execute o projeto
npm run dev

Frontend:

http://localhost:5173
🗄️ Modelagem Inicial do Banco
User
id
name
email
password
createdAt
Ticket
id
title
description
status
priority
userId
createdAt
Comment
id
message
ticketId
userId
createdAt
🔐 Autenticação

O projeto utiliza:

JWT Token
Senhas criptografadas com bcrypt
Middleware de autenticação
📌 Melhorias Futuras
Upload de anexos
Sistema de permissões
Dashboard avançado
Notificações
Deploy com Docker
Testes automatizados
Swagger Documentation
📷 Screenshots

Em breve...

📄 Licença

Projeto desenvolvido apenas para fins de estudo e portfólio.

👨‍💻 Autor

Jonathan Hainzenreder

LinkedIn:(https://www.linkedin.com/in/jonathan-hainzenreder/)
GitHub: https://github.com/jonathanhainzen
