# Educa Blog Node.js

## Descrição

Uma aplicação de blogging para professores da rede pública de educação, permitindo que eles postem e compartilhem conteúdo com seus alunos.

## Setup Inicial

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/educa_blog_nodejs.git
   cd educa_blog_nodejs
   ```
   
2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
    ```bash
    DB_NAME=educablog
    DB_USER=educablog
    DB_PASSWORD=123456
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=mySuperSecretKey12345!
    ```

4. Inicie a aplicação:
    ```bash
    npm start
    ```

# Arquitetura da Aplicação

* server.ts: Arquivo principal que configura o servidor Express e a conexão com o MongoDB.
* src/
  * controllers/: Contém os controladores para manipulação das operações de CRUD.
  * models/: Contém os modelos de dados.
  * interfaces/: Contém as definições das interfaces.
  * repositories/: Contém a lógica de acesso a dados.
  * services/: Contém a lógica de negócios.
  * routes/: Contém as definições de rotas.
  * middlewares/: Contém os middlewares de autenticação e validação.
  * errors/: Contém a classe de erro personalizada.

# Guia de Uso das APIs

### Endpoints

* **GET /api/posts**: Lista todos os posts.
* **GET /api/posts/:id**: Obtém um post por ID.
* **POST /api/posts**: Cria um novo post (Requer autenticação).
* **PUT /api/posts/:id**: Atualiza um post existente (Requer autenticação).
* **DELETE /api/posts/:id**: Exclui um post (Requer autenticação).
* **GET /api/posts/search?q=palavra-chave**: Busca posts por palavra-chave.

### Exemplos de Requisição e Resposta

### GET /api/posts
```http
GET /api/posts HTTP/1.1
Host: localhost:3000
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
Content-Type: application/json
x-auth-token: seu_token_jwt

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
x-auth-token: seu_token_jwt

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
x-auth-token: seu_token_jwt
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

# Estrutura dos Diretórios

Para uma melhor compreensão da estrutura da aplicação, aqui está um detalhamento dos diretórios e arquivos:
````
educa_blog_nodejs
│
├── src/
│   ├── config/
│   │   ├── database.ts              
│   │   └── logger.ts                
│   │
│   ├── controllers/
│   │   ├── authController.ts         
│   │   └── postController.ts         
│   │
│   ├── interfaces/
│   │   └── IPost.ts                  
│   │
│   ├── models/
│   │   ├── postModel.ts              
│   │   └── userModel.ts              
│   │
│   ├── repositories/
│   │   └── postRepository.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts             
│   │   └── postRoutes.ts             
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts          
│   │   ├── validationMiddleware.ts     
│   │   ├── errorHandler.ts             
│   │   └── index.ts                    
│   │
│   ├── services/
│   │   ├── postService.ts             
│   │   └── userService.ts             
│   │
│   ├── errors/
│   │   └── AppError.ts                
│   │
│   └── app.ts                         
│
├── .env                                
├── .gitignore                          
├── Dockerfile                          
├── docker-compose.yml                  
├── package.json                        
├── tsconfig.json                       
└── README.md                           
````

# Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente no arquivo .env:

* DB_NAME=educablog
* DB_USER=educablog
* DB_PASSWORD=123456
* DB_HOST=localhost
* DB_PORT=5432
* JWT_SECRET=mySuperSecretKey12345!

# Scripts Disponíveis

No package.json, você tem os seguintes scripts disponíveis:

* start: Inicia a aplicação.
* test: Executa os testes usando Mocha.

Para iniciar a aplicação:
```bash
npm start
```

Para executar os testes:
```bash
npm test
```
⠀
# Docker

Para rodar a aplicação usando Docker:

1. Construa a imagem:
```bash
docker build -t educa_blog_nodejs .
```
2. Rode a aplicação:
```bash
docker-compose up
```

# CI/CD com GitHub Actions

### Workflow de CI/CD

**.github/workflows/ci-cd.yml**
````
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

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: educablog
          POSTGRES_PASSWORD: 123456
          POSTGRES_DB: educablog
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        env:
          DATABASE_URL: postgres://educablog:123456@localhost:5432/educablog
        run: npm test

      - name: Build project
        run: npm run build
````

# Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Fork o repositório.
2. Crie uma nova branch (git checkout -b feature/nova-feature).
3. Commit suas mudanças (git commit -am 'Adiciona nova feature').
4. Push para a branch (git push origin feature/nova-feature).
5. Abra um Pull Request.

# Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.