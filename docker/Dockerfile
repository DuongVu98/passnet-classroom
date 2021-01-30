FROM node:12-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:build" ]