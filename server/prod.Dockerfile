FROM node:20-alpine

RUN mkdir -p /application
COPY . /application
WORKDIR /application

RUN npm install

RUN npm install pm2 -g  

CMD pm2 start index.js && pm2 monit