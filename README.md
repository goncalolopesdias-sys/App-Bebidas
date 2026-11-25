# App de Bebidas

Aplicação móvel para comprar bebidas (cervejas, vodkas e whiskies), com backend próprio. Projeto do 1.º ano do CTeSP em Desenvolvimento para Dispositivos Móveis, no ISTEC Lisboa.

## Funcionalidades
- Registo e login de utilizadores
- Catálogo de produtos por categoria (cerveja, vodka e whisky)
- Detalhe de cada produto
- Carrinho de compras e criação de pedidos
- Perfil do utilizador e notificações
- Página de administração simples (`backend/admin.html`)

## Tecnologias
- **App:** React Native, Expo (Expo Router) e TypeScript
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Autenticação:** JWT e bcryptjs

## Estrutura
```
app-bebidas/
├── frontend/   # app móvel (Expo)
└── backend/    # API REST (Express + MongoDB)
```

## Como correr

### 1. Backend
Precisas de Node.js e de um MongoDB a correr.

```bash
cd backend
npm install
cp .env.example .env   # e edita o JWT_SECRET
node seed.js           # preenche a base de dados com os produtos
node server.js
```

### 2. App
Em `frontend/src/api.ts`, troca o IP em `API_URL` pelo IP do teu computador na rede local.

```bash
cd frontend
npm install
npx expo start
```

## API
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Criar conta |
| POST | `/api/auth/login` | Iniciar sessão |
| GET | `/api/produtos` | Listar produtos (filtro opcional `?categoria=`) |
| GET, POST, PUT, DELETE | `/api/produtos/:id` | Gerir produtos |
| GET, POST, PUT, DELETE | `/api/pedidos` | Gerir pedidos (requer login) |
