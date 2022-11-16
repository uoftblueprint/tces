# pull official base image
FROM node:18.12.0-alpine

# set working directory
WORKDIR /usr/src/server

# add packages and install them
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci

# add app
COPY . .

# start app
EXPOSE 3001
CMD ["npm", "start"]
