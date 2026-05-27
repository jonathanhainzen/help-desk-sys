# Help Desk System

Sistema de chamados Help Desk desenvolvido para estudo, prática full stack e portfólio.

O objetivo é simular um sistema real de suporte técnico, permitindo abertura, gerenciamento e acompanhamento de tickets.

## Tecnologias

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt

### Frontend

- React
- Vite
- Axios
- React Router DOM

### Banco de dados

- PostgreSQL
- Docker

## Objetivos do projeto

- Aprender desenvolvimento full stack
- Praticar criação de APIs REST
- Trabalhar com autenticação JWT
- Utilizar PostgreSQL em um projeto real
- Integrar frontend e backend
- Criar um projeto profissional para GitHub e portfólio

## Funcionalidades planejadas

### Usuários

- Cadastro de usuários
- Login com autenticação JWT
- Controle de sessão

### Tickets

- Criar chamado
- Listar chamados
- Atualizar status
- Editar prioridade
- Adicionar comentários
- Filtrar tickets

### Dashboard

- Quantidade de tickets abertos
- Tickets finalizados
- Tickets por prioridade

## Estrutura do projeto

```txt
help-desk-sys/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
└── README.md
```

## Instalação do backend

Use uma das opções abaixo para disponibilizar o PostgreSQL.

### Opção 1: PostgreSQL com Docker

```bash
docker compose up -d
```

### Opção 2: PostgreSQL local

Instale o PostgreSQL no Windows e crie um banco chamado `helpdesk`.

Dados esperados pela configuração padrão:

```txt
Host: localhost
Porta: 5432
Database: helpdesk
Usuário: postgres
Senha: postgres
```

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

Configure a variável `DATABASE_URL` no `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/helpdesk?schema=public"
JWT_SECRET="troque-este-segredo"
PORT=3000
```

Execute as migrations:

```bash
npm run prisma:migrate
```

Inicie o servidor:

```bash
npm run dev
```

Endpoint inicial:

```txt
GET http://localhost:3000/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "help-desk-sys-api"
}
```

## Endpoints iniciais

### Health check

```txt
GET http://localhost:3000/health
```

### Cadastro de usuário

```txt
POST http://localhost:3000/auth/register
```

Body:

```json
{
  "name": "Jonathan",
  "email": "jonathan@example.com",
  "password": "123456"
}
```

### Login

```txt
POST http://localhost:3000/auth/login
```

Body:

```json
{
  "email": "jonathan@example.com",
  "password": "123456"
}
```

As rotas de autenticação retornam o usuário sem a senha e um token JWT.

## Modelagem inicial

### User

- id
- name
- email
- password
- createdAt
- updatedAt

### Ticket

- id
- title
- description
- status
- priority
- userId
- createdAt
- updatedAt

### Comment

- id
- message
- ticketId
- userId
- createdAt
- updatedAt

## Melhorias futuras

- Upload de anexos
- Sistema de permissões
- Dashboard avançado
- Notificações
- Deploy com Docker
- Testes automatizados
- Documentação Swagger

## Autor

Jonathan Hainzenreder

- LinkedIn: <https://www.linkedin.com/in/jonathan-hainzenreder/>
- GitHub: <https://github.com/jonathanhainzen>
