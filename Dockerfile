FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

COPY prisma ./prisma

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
