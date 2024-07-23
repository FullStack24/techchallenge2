# Dockerfile
FROM node:21

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código
COPY . .

# Compilando o TypeScript
RUN npm run build

# Expondo a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/app.js"]