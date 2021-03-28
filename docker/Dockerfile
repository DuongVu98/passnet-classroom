FROM node:12-alpine3.9 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

RUN npm run build

EXPOSE 3000

FROM node:12-alpine3.9

ARG NODE_ENV=production
ARG ENV_PATH=.

ENV NODE_ENV=${NODE_ENV}
ENV ENV_PATH=${ENV_PATH}

COPY ./dist ./src/env /app --from build

ENTRYPOINT ["node", "dist/main"]