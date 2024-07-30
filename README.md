# Educa Blog Node.js

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
    ```bash
    DATABASE_URL="postgresql://educablog:123456@localhost:5432/educablog?schema=public"
    ```

4. Inicie a aplicação:
    ```bash
    npm start
    ```

# Arquitetura da Aplicação

A aplicação segue uma arquitetura organizada para separar as responsabilidades e facilitar a manutenção:

````
techchallenge2
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
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
│   │   └── postController.ts    
│   │
│   ├── errors/
│   │   └── AppError.ts          
│   │
│   ├── interfaces/
│   │   ├── IPost.ts             
│   │   └── JwtPayload.ts        
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
│   │   └── postRoutes.ts        
│   │
│   ├── services/
│   │   ├── postService.ts       
│   │   └── userService.ts       
│   │
│   ├── tests/
│   │   └── postService.test.ts  
│   │
│   └── app.ts                  
│
├── .env                         
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
├── tsconfig.json                
└── tsconfig.build.json                                            
````


# Guia de Uso das APIs

### Endpoints

* **GET /api/posts**: Lista todos os posts. (Requer autenticação).
* **GET /api/posts/:id**: Obtém um post por ID. (Requer autenticação).
* **POST /api/posts**: Cria um novo post (Requer autenticação).
* **PUT /api/posts/:id**: Atualiza um post existente (Requer autenticação).
* **DELETE /api/posts/:id**: Exclui um post (Requer autenticação).
* **GET /api/posts/search?q=palavra-chave**: Busca posts por palavra-chave.

### Exemplos de Requisição e Resposta

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

* `DATABASE_URL`="postgresql://educablog:123456@localhost:5432/educablog?schema=public"

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

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Set up Docker
      uses: docker/setup-docker@v2
      with:
        docker-version: 'latest'

    - name: Build Docker image
      run: docker build -t my-app:latest .

    - name: Run Prisma Migrations
      run: docker run --rm my-app:latest npx prisma migrate deploy

    - name: Run Tests
      run: docker run --rm my-app:latest npm test

    - name: Deploy to Production
      env:
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
      run: |
        docker run -d -p 3000:3000 my-app:latest
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