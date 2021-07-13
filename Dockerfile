FROM node:12.19.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ .

RUN yarn

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "start" ]