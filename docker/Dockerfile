FROM node:15.12.0-alpine3.10 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .build-deps make gcc g++ python
RUN npm install --production --silent
RUN apk del .build-deps

COPY . .

RUN npm run build


FROM node:15.12.0-alpine3.10

ARG NODE_ENV=production
ARG ENV_PATH=.

ENV NODE_ENV=${NODE_ENV}
ENV ENV_PATH=${ENV_PATH}

COPY --from=build /usr/src/app/dist /usr/src/app/src/env ./

ENTRYPOINT ["node", "main"]
