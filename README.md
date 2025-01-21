
# ***API Bancária***

Este projeto consiste em uma API bancária que gerencia clientes e transações PIX, além de um front-end simples para interação com a API. O sistema permite criar clientes, adicionar transações PIX e listar as transações realizadas.

## ***Tecnologias Utilizadas***
Back-end:
- Node.js
- Express
- Typescript
- Postgresql (Banco de dados)
- Prisma ORM
- JWT
- Docker

Front-end:
- React
- Typescript
- TailwindCSS

## ***Funcionalidades***:
### Back-end:
1. Criação de cliente: Permite criar cadastro de cliente para acessar o sistema.
2. Listar Pix: Permite visualizar todos os pix's registrados do cliente conectado.
3. Adicionar Pix: Permite cadastrar novos pix's inserindo somente o valor desejado.

### Front-End:

1. Realizar Login: Interface para realizar Login.
2. Cadastrar Cliente: Interface para criação de registro.
3. Listar Pix: Interface que visualiza os pix's registrados.
4. Pagamento: Interface que possibilita fazer pagamento do pix.

## ***Como executar o projeto***
### 1. Rodando o Back-end
1. Clone o repositório:
```bash
git clone https://github.com/ViniciusANascimento/api-bancaria.git
cd api-bancaria
```
2. Instale as dependencias do back-end:
```bash
cd backend
npm install
```
3. Crie arquivo .env e configure
```bash
#POSTGRES
DATABASE_URL="postgresql://valida_pix:valida_pix-dev@localhost:5432/validapix?schema=public"

#JWT
JWT_EXPIRATION=7d
JWT_SECRET="sa4d54sa8d48sac435xz8cx3z4c1z8x6c31"

#SERVER
PORT=3001
HOST=localhost
```
4. Execute o Docker
```
docker compose up -d
```
5. Realize as migrações
```
npx prisma migrate deploy
```
6. Atualize as informações do banco de dados
```
npx prisma generate
```
7. Execute a aplicação
```bash
npm run dev
```

Com isso a aplicação estará sendo executada em http://localhost:3001

### 2. Rodando o Front-end
1. Clone o repositório:
```bash
git clone https://github.com/ViniciusANascimento/api-bancaria.git
cd api-bancaria
```
2. Instale as dependencias do back-end:
```bash
cd frontend
npm install
``` 
3. Execute a aplicação
```bash
npm start
```

A Aplicação estará disponivel em http://localhost:3000
## ***Rotas***
### back-end:
```
Login:
POST /login # login do cliente
POST /clients # cadastro de cliente

JWT Rotas
POST /clients/pix # cadastro de pix
GET /clients/pix # consulta de pix
PATCH /clients/pix # pagamento de pix
```
### front-end:
```
/Login # realização de Login do sistema
/signin # cadastro de cliente

JWT 
/home # rota principal
```


## ***Primeiros Passos***
1. Apos o sistema do Front-end abrir automaticamente para a tela de Login, clicar em **Cadastrar-se** para criar um cadastro de cliente.
2. Com o sistema conectado pode realizar as operações de **Cadastro** e **Consulta** de Pix, como tambem podendo pagar pix já cadastrados.
