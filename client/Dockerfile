# pull official base image
FROM node:lts-alpine
ENV NODE_ENV=production

# set working directory
WORKDIR /usr/src/client

# add packages and install them
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

# add app
COPY . .

# start app
EXPOSE 3000
RUN chown -R node /usr/src/client
USER node
CMD ["npm", "start"]
