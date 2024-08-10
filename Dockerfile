FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Instala netcat-openbsd para o script de espera
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]
