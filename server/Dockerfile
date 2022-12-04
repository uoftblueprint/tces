# pull official base image
FROM node:18.12.0-alpine as base

# set working directory
WORKDIR /home/node/app

# add packages and install them
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*","./"]
RUN npm ci

# add app
COPY . .

FROM base as production
ENV NODE_PATH = ./build
RUN npm run build

