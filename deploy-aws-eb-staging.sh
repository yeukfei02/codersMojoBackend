
# create .elasticbeanstalk folder
eb init

# docker login
aws --region ap-southeast-1 ecr get-login-password | docker login --username AWS --password-stdin https://151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web

# docker-compose
docker-compose up -d --build

# docker tag
docker tag codersmojobackend_web:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest

# docker push
docker push 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest

# docker-compose down
docker-compose down

# docker rmi images
docker rmi codersmojobackend_web:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest

# docker clear system, clear volume
docker system prune
docker volume prune

# eb deploy
eb deploy --message="deploy new version"