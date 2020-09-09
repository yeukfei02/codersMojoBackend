# codersMojoBackend

CodersMojo is an AI-based peer-to-peer interactive tech interview platform for Women to connect with great tech companies and prepare them well for their tech interview.

documentation: https://documenter.getpostman.com/view/3827865/TVCjxmDv

## Requirement:
 - install yarn
 - install node (v12+)
 - install postgres

## Testing and run:
```
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint
```

```
every time table change needs to run:

// update schema.prisma from existing database, generate artifacts (e.g. Prisma Client)
$ yarn run generate:prisma

// format schema.prisma
$ yarn run format:prisma

// show experimental command
$ npx prisma --experimental
```

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/codersmojo-api:<tag> .
docker run -p 3000:3000 -d <username>/codersmojo-api:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost:3000

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```

build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost:3000