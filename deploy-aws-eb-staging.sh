
# create .elasticbeanstalk folder
eb init

# docker-compose
docker-compose up -d --build

# docker login
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com

# docker tag, docker push (web)
docker tag codersmojobackend_web:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest
docker push 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest

# docker tag, push (prisma-studio)
docker tag codersmojobackend_prisma-studio:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-prisma-studio:latest
docker push 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-prisma-studio:latest

# docker-compose down
docker-compose down

# docker rmi images
docker rmi codersmojobackend_web:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest
docker rmi codersmojobackend_prisma-studio:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-prisma-studio:latest

# docker clear system, clear volume
docker system prune
docker volume prune

# eb deploy
eb deploy --message="deploy new version"