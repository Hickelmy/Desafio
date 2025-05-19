# 🏥 Projeto Full Stack - Gestão de Clínicas

Sistema completo com autenticação, painel administrativo, CRUD de clínicas e funcionalidades modernas como tema escuro, responsividade e persistência de dados com Angular 17 e NestJS.

## 📦 Tecnologias utilizadas

### Frontend
- Angular 17
- Angular Material
- NGXS (ou NGRX)
- RXJS
- SCSS, Tailwind , Angular Material
- Lazy loading + ChangeDetectionStrategy.OnPush

### Backend
- NestJS
- TypeORM
- PostgreSQL ou SQLite
- DTOs + Validações
- Docker + Docker Compose

---

## 🚀 Como rodar o projeto

### 🐳 Usando Docker

1. **Clone o projeto**
```bash
git clone https://github.com/Hickelmy/Desafio.gitt
```

2. **Frontend**
```bash
cd frontend-clinicas
docker compose up -d --build
```

3. **Backend**
```bash
cd backend-clinicas
docker compose up -d --build
```

4. Acesse:
- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend: [http://localhost:3000](http://localhost:3000/api)

> Certifique-se de que as portas 4200 e 3000 estejam livres.

---

## 🧪 Rodar Localmente

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Backend
```bash
cd backend-clinicas
npm install
npm run start:dev
```

---

## 🔐 Funcionalidade: Autenticação

- Tela de login com validação de campos
- Feedback visual de erro e carregamento
- Ícone para exibir/esconder senha
- Armazenamento persistente via `store` + `refresh token`
- Redirecionamento automático após autenticação

---

## 🧾 Funcionalidade: CRUD de Clínicas

### 📄 Listagem
- Tabela com paginação e ordenação
- Filtro com debounce
- Ações de editar e visualizar
- Estado do filtro salvo na URL

### ✏️ Cadastro / Edição
- Formulário reativo com validações (incluindo CNPJ e especialidades mínimas)
- Regional com select assíncrono
- Feedback visual de erro/sucesso

### 👁️ Visualização
- Layout humanizado e responsivo
- Modal para ver todas as especialidades se >5
- Tela protegida até dados carregarem

---

## 🗂️ Campos esperados para cadastro

| Campo                        | Tipo         | Obrigatório |
|-----------------------------|--------------|-------------|
| Razão social                | texto        | ✅          |
| Nome fantasia               | texto        | ✅          |
| CNPJ                        | texto        | ✅ + validação |
| Regional                    | select       | ✅          |
| Data de inauguração         | data         | ✅          |
| Ativa                       | checkbox     | ❌          |
| Especialidades médicas      | multi-select | ✅ mínimo 5 |

---

## 🧱 Backend - Organização

- Arquitetura modular
- DTOs para validação e filtro
- Erros tratados com interceptadores
- Login com JWT + Refresh Token
- Docker com banco embutido (Postgres)

---

## 📚 Boas práticas esperadas

- Gerenciamento de estado imutável com NGXS/NGRX
- ChangeDetection `OnPush`
- Sem lógica diretamente nos templates
- Lazy loading de módulos
- Código limpo, tipado

---
