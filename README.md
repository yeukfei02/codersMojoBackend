# codersMojoBackend

CodersMojo is an AI-based peer-to-peer interactive tech interview platform for Women to connect with great tech companies and prepare them well for their tech interview.

documentation: <https://documenter.getpostman.com/view/3827865/TVCjxmDv>

staging: <https://coders-mojo-backend-staging.com/>

prod: <https://coders-mojo-backend.com/>

## Requirement

- install yarn
- install node (v12+)
- install postgres

## Testing and run

```zsh
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// create dist folder
$ yarn run build

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint

// pull the schema from an existing database, updating the Prisma schema, generate artifacts (e.g. Prisma Client)
$ yarn run generate:prisma

// format schema.prisma
$ yarn run format:prisma

// load seed file to database
$ yarn run db:seed

// create migrations file and run migrations
$ yarn run db:migrate

// check migrations status
$ yarn run db:migrate:status

// reset database
$ yarn run db:reset

// push schema.prisma to database
$ yarn run db:push

// show preview feature
$ npx prisma --preview-feature
```

## Docker

```zsh
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:3000
