FROM node:12-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

RUN npm run build

EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "dist/main"]