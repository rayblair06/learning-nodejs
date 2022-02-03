FROM node:16.13.2-alpine3.14

ARG NODE_ENV=production

WORKDIR /app
COPY / ./

RUN npm ci --production

EXPOSE 3000

CMD npx babel-node -r dotenv/config ./src/app.js
