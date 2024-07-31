FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Copia o arquivo .env.docker para o contêiner
COPY .env.docker .env

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && ts-node src/app.ts"]
