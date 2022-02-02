# learning-nodejs

This is an example application for Node.js.

## Requirements

- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com) / [Yarn](https://yarnpkg.com)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Installation

### _Development_

Follow the steps below to build and start the NodeJS server.

Install dependencies and copy over .env
```
npm install
cp .env.example .env
```

Start Postgres Server (with Docker)
```
docker run -d \
    --name postgres \
    -e POSTGRES_DB=nodejs \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=secret \
    -p 5432:5432 \
    postgres
```

Migrate database schema
```
npm run migrate
```

Populate database with seeded data
```
npm run seed
```

Start NodeJS Server
```
npm run start
```

## Commands
```
npm start                     # Start NodeJS server
npm run lint                  # Lint and fix formatting
npm run test                  # Run tests (WIP)
npm run migrate               # Migrate database schema
npm run migrate-fresh         # Drop database schema then rebuild
npm run seed                  # Populate database with seeded data
```
