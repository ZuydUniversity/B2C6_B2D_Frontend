FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la && node -v && npm -v

RUN npm run build --loglevel verbose

ENV NODE_ENV production

CMD ["npm", "start"]

EXPOSE 3000