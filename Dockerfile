FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build

# Instalando ts-node globalmente
RUN npm install -g ts-node

COPY .env.docker .env

EXPOSE 3000

CMD ["npx", "ts-node", "src/app.ts"]
