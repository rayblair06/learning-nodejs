# learning-nodejs

## Installation
```
npm install
cp .env.example .env
```

### Start NodeJS Server
```
npm run start
```

### Start Postgres Server (with Docker)
```
docker run -d \
    --name postgres \
    -e POSTGRES_DB=nodejs \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=secret \
    -p 5432:5432 \
    postgres
```

### Lint and fix formatting
```
npm run lint
```

### Migrate
```
npm run migrate
```

### Seed
```
npm run seed
```
