# QoL commands

build:
	@docker-compose -f docker-compose.yml build

build-db:
	@docker run -d \
		--name postgres \
		-e POSTGRES_DB=nodejs \
		-e POSTGRES_USER=root \
		-e POSTGRES_PASSWORD=secret \
		-p 5432:5432 \
		postgres

start:
	@docker-compose up -d --build app

start-db:
	@docker start postgres

stop-db:
	@docker stop postgres

restart-db: stop-db start-db
