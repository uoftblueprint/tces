# pull official base image
FROM node:18.12.0-bullseye-slim
ENV NODE_ENV=production

RUN npm install -g create-react-app

# set working directory
WORKDIR /usr/src/client

# add packages and install them
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --only=production

# add app
COPY . .

# start app
EXPOSE 3000
RUN chown -R node /usr/src/client
USER node
CMD ["npm", "start"]
