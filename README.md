# Educa Blog Node.js

## Problema
Atualmente, a maior parte de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. O EducaBlog foi criado para resolver esse problema, proporcionando uma plataforma dinâmica e acessível para que professores possam compartilhar conhecimento com seus alunos de forma eficiente.

## Descrição

O EducaBlog é uma aplicação de blogging projetada para professores da rede pública de educação, permitindo que eles postem e compartilhem conteúdo educativo com seus alunos.

## Setup Inicial

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/techchallenge2.git
cd techchallenge2
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
```
DATABASE_URL=postgresql://educablog:123456@db:5432/educablog?schema=public
JWT_SECRET=F6&uP!5m@6B0g3vR8kL*Q9z7D
 ```

4. Inicie o banco de dados com o Docker:

```bash
docker-compose up --build  
```

5. Gere o cliente Prisma e aplique as migrações:

```bash
npx prisma generate
docker-compose exec app npx prisma db push
```

6. Inicie a aplicação:
```bash
docker-compose up
```
   
# Experiências e Desafios

Durante o desenvolvimento deste projeto, enfrentamos diversos desafios, como a integração de autenticação e autorização, garantia de cobertura de testes e configuração de workflows de CI/CD. Cada desafio foi uma oportunidade de aprendizado e crescimento para a equipe.
**Desafios Técnicos:**
- Implementação da autenticação JWT.
- Integração com o banco de dados PostgreSQL.
- Garantia de cobertura mínima de 30% de testes unitários.
- Configuração e automação de CI/CD com GitHub Actions.

# Arquitetura da Aplicação

A aplicação segue uma arquitetura organizada para separar as responsabilidades e facilitar a manutenção:

````
techchallenge2
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── coverage/
│
├── dist/
│
├── node_modules/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── logger.ts
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── postController.ts
│   │   └── userController.ts
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │
│   ├── interfaces/
│   │   ├── IPost.ts
│   │   └── IUser.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── validationMiddleware.ts
│   │
│   ├── models/
│   │   ├── postModel.ts
│   │   └── userModel.ts
│   │
│   ├── repositories/
│   │   ├── postRepository.ts
│   │   └── userRepository.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── postRoutes.ts
│   │   └── userRoutes.ts
│   │
│   ├── services/
│   │   ├── postService.ts
│   │   └── userService.ts
│   │
│   ├── tests/
│   │   ├── postService.test.ts
│   │   └── userService.test.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   └── yamljs.d.ts
│   │
│   ├── utils/
│   │   ├── checkEnv.ts
│   │   └── getIdFromToken.ts
│   │
│   └── app.ts
│
├── .env
├── .gitignore
├── combined.log
├── docker-compose.yml
├── Dockerfile
├── error.log
├── eslint.config.mjs
├── jest.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── swagger.yaml
├── tsconfig.json
└── tsconfig.build.json
````


# Guia de Uso das APIs

### Endpoints

* **GET /api/users**: Lista todos os usuários.
* **POST /api/auth/register**: Registra um novo usuário.
* **POST /api/auth/login**: Autentica um usuário e retorna um token JWT.
* **GET /api/posts**: Lista todos os posts. (Requer autenticação).
* **GET /api/posts/:id**: Obtém um post por ID. (Requer autenticação).
* **POST /api/posts**: Cria um novo post (Requer autenticação).
* **PUT /api/posts/:id**: Atualiza um post existente (Requer autenticação).
* **DELETE /api/posts/:id**: Exclui um post (Requer autenticação).
* **GET /api/posts/search?q=palavra-chave**: Busca posts por palavra-chave.

### Exemplos de Requisição e Resposta

### Utilize o Swagger para testar as requisições:

```http://localhost:3000/api-docs/#/ ```

### POST /api/auth/register

```http
POST /api/auth/register HTTP/1.1
Host: localhost:3000
Content-Type: application/json
    
        {
            "username": "usuario2",
            "password": "senhaSegura"
        }
```

### Resposta:

```json
    {
      "id": 2,
      "username": "usuario2",
      "createdAt": "2024-08-09T12:34:56.000Z",
      "updatedAt": "2024-08-09T12:34:56.000Z"
    }
```

### POST /api/auth/login

```http     
POST /api/auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
    
        {
            "username": "usuario2",
            "password": "senhaSegura"
        }
```

### Resposta
```json
    {
        "token": "seu_token_jwt"
    }
```

### GET /api/users

```http
GET /api/users HTTP/1.1
Host: localhost:3000
```
### Resposta
    
    ```json
    [
        {
            "id": 1,
            "username": "usuario1",
            "createdAt": "2024-08-09T12:34:56.000Z",
            "updatedAt": "2024-08-09T12:34:56.000Z"
        }
    ]

    ```

        

### GET /api/posts

```http
GET /api/posts HTTP/1.1
Host: localhost:3000
Authorization: Bearer seu_token_jwt
```

### Resposta:

```json
[
  {
    "id": 1,
    "title": "Primeiro Post",
    "content": "Este é o conteúdo do primeiro post.",
    "author": "Professor João",
    "createdAt": "2023-10-12T12:59:26.123Z",
    "updatedAt": "2023-10-12T12:59:26.123Z"
  }
]
```

### POST /api/posts

```http
POST /api/posts HTTP/1.1
Host: localhost:3000
Authorization: Bearer seu_token_jwt

    {
        "title": "Novo Post",
        "content": "Conteúdo do novo post.",
        "author": "Professor Maria"
    }
```

### Resposta:

```json
{
  "id": 2,
  "title": "Novo Post",
  "content": "Conteúdo do novo post.",
  "author": "Professor Maria",
  "createdAt": "2023-10-12T12:59:26.123Z",
  "updatedAt": "2023-10-12T12:59:26.123Z"
}
```

### GET /api/posts/:id

```http
GET /api/posts/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer seu_token_jwt
```

### Resposta:

```json
{
  "id": 1,
  "title": "Primeiro Post",
  "content": "Este é o conteúdo do primeiro post.",
  "author": "Professor João",
  "createdAt": "2023-10-12T12:59:26.123Z",
  "updatedAt": "2023-10-12T12:59:26.123Z"
}
```

### PUT /api/posts/:id

```http
PUT /api/posts/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer seu_token_jwt

    {
        "title": "Título Atualizado",
        "content": "Conteúdo Atualizado",
        "author": "Professor João"
    }
```

### Resposta:

```json
{
  "id": 1,
  "title": "Título Atualizado",
  "content": "Conteúdo Atualizado",
  "author": "Professor João",
  "createdAt": "2023-10-12T12:59:26.123Z",
  "updatedAt": "2023-10-12T12:59:26.123Z"
}
```

### DELETE /api/posts/:id

```http
DELETE /api/posts/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer seu_token_jwt
```

### Resposta:

```json
{
  "message": "Post excluído com sucesso"
}
```

**GET /api/posts/search?q=palavra-chave**

```http
GET /api/posts/search?q=Primeiro HTTP/1.1
Host: localhost:3000
Authorization: Bearer seu_token_jwt
```

### Resposta:

```json
[
  {
    "id": 1,
    "title": "Primeiro Post",
    "content": "Este é o conteúdo do primeiro post.",
    "author": "Professor João",
    "createdAt": "2023-10-12T12:59:26.123Z",
    "updatedAt": "2023-10-12T12:59:26.123Z"
  }
]
```

### Variáveis de Ambiente
Certifique-se de configurar as seguintes variáveis de ambiente no arquivo `.env`:

* `DATABASE_URL`=postgresql://educablog:123456@db:5432/educablog?schema=public
* `JWT_SECRET`=F6&uP!5m@6B0g3vR8kL*Q9z7D
### Scripts Disponíveis

**start**: Inicia a aplicação com `ts-node` para executar `src/app.ts`.
```bash
npm start
```

**build**: Transpila o código TypeScript para JavaScript usando o TypeScript Compiler (tsc).
```bash
npm run build
```

**lint**: Executa o ESLint para verificar o código fonte.
```bash
npm run lint
```

**format**: Formata o código fonte usando Prettier.
```bash
npm run format
```

**test**: Executa os testes com Jest.
```bash
npm test
```

### Como Usar

Para iniciar a aplicação:

```bash
npm start
```

Para transpilar o código TypeScript:
```bash
npm run build
```

Para verificar o código fonte com linting:
```bash
npm run lint
```

Para formatar o código fonte:
```bash
npm run format
```

Para executar os testes:

```bash
npm test
```

# Docker

Para rodar a aplicação usando Docker:

1. Rode a aplicação:
```bash
docker-compose up --build
```

## Cobertura de Testes
O projeto deve garantir que pelo menos 30% do código seja coberto por testes unitários. Para verificar a cobertura de testes, você pode usar o Jest com a seguinte configuração:

1. Execute os testes com cobertura:
   ```bash
   npm test -- --coverage
   ```
2. O relatório de cobertura será gerado na pasta coverage/. Você pode visualizar o índice de cobertura e as partes do código que estão sendo testadas.

## Autenticação e Autorização
A aplicação utiliza JSON Web Tokens (JWT) para autenticação de usuários. Ao fazer login, um token é gerado e deve ser incluído no cabeçalho `Authorization` das requisições para os endpoints que requerem autenticação.

1. **Login**: O endpoint `/api/auth/login` permite que os usuários se autentiquem e recebam um token JWT.
2. **Proteção dos Endpoints**: Os endpoints que modificam dados (POST, PUT, DELETE) estão protegidos por um middleware de autenticação que verifica a validade do token antes de permitir a execução das operações.

# CI/CD com GitHub Actions

### Workflow de CI/CD

**.github/workflows/ci-cd.yml**

```
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Install Docker Compose
        run: |
          sudo apt-get update
          sudo apt-get install -y docker-compose

      - name: Build Docker images
        run: docker-compose build

      - name: Run Prisma Migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_DOCKER }}
        run: |
          docker-compose run --rm app npx prisma migrate deploy

      - name: Run Tests
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_DOCKER }}
        run: |
          docker-compose run --rm app npm test

      - name: Stop and Remove Existing Containers
        run: |
          docker-compose down

      - name: Deploy to Production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_DOCKER }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: |
          docker-compose up -d
````

# Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Fork o repositório.
2. Crie uma nova branch (git checkout -b feature/nova-feature).
3. Commit suas mudanças (git commit -am 'Adiciona nova feature').
4. Push para a branch (git push origin feature/nova-feature).
5. Abra um Pull Request.

# Equipe

* Ariel Andrielli Rodrigues da Silva
* Gustavo Almeida Carriel
* José Luccas Gabriel Francisco de Andrade Santos
* Vitor Vilson Laurentino
* Thwany Leles

## Considerações Finais
O EducaBlog é uma ferramenta projetada para facilitar a comunicação entre professores e alunos, promovendo um ambiente de aprendizado mais dinâmico e acessível. Acreditamos que com a implementação deste projeto, conseguiremos oferecer uma plataforma que atenda às necessidades da educação pública.

Agradecemos a todos que contribuíram para este projeto e esperamos que ele possa ser uma ferramenta valiosa para a comunidade educacional.

**Nota**: Este README é um documento vivo e será atualizado conforme novas funcionalidades e melhorias forem implementadas.

# Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
