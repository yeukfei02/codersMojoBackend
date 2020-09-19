
# create .elasticbeanstalk folder
eb init

# docker login
aws --region ap-southeast-1 ecr get-login-password | docker login --username AWS --password-stdin https://151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web

# run docker-compose
docker-compose up -d --build

# docker tag
docker tag codersmojobackend_web:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest
docker tag codersmojobackend_prisma-studio:latest 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-prisma-studio:latest

# docker push
docker push 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-web:latest
docker push 151708502202.dkr.ecr.ap-southeast-1.amazonaws.com/coders-mojo-backend-staging-prisma-studio:latest

# deploy command
eb deploy --message="deploy new version"