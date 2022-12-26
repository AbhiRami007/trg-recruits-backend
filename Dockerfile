FROM node:13-alpine

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8002
CMD [ "npm", "start" ]