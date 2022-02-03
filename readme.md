# learning-nodejs ![Build Status](https://github.com/rayblair06/learning-nodejs/workflows/Build/badge.svg) ![Tests Status](https://github.com/rayblair06/learning-nodejs/workflows/Run%20linting%20and%20tests/badge.svg)

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
npm run generate-key
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
npm run generate-key          # Generate App Key
npm run lint                  # Lint and fix formatting
npm run test                  # Run tests (WIP)
npm run migrate               # Migrate database schema
npm run migrate-fresh         # Drop database schema then rebuild
npm run seed                  # Populate database with seeded data
```
