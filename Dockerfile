# Use a imagem Node.js oficial
FROM node:21

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração do npm e instale as dependências
COPY package*.json ./
COPY wait-for-db.sh /usr/src/app/wait-for-db.sh
RUN npm install

# Instale o cliente PostgreSQL para verificação
RUN apt-get update && apt-get install -y postgresql-client

# Copie o restante dos arquivos da aplicação
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate

# Compile a aplicação
RUN npm run build

# Exponha a porta 3000 para acessar a aplicação
EXPOSE 3000

# Adicione o script de espera
COPY wait-for-db.sh /usr/src/app/wait-for-db.sh
RUN chmod +x /usr/src/app/wait-for-db.sh

# Defina o comando de inicialização com o script de espera
CMD ["sh", "-c", "/usr/src/app/wait-for-db.sh && npx prisma migrate deploy && node dist/app.js"]
