# pull official base image
FROM node:18.12.0-slim
ENV NODE_ENV=production

# set working directory
WORKDIR /usr/src/server

# add packages and install them
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

# add app
COPY . .

# start app
EXPOSE 3001
RUN chown -R node /usr/src/server
USER node
CMD ["npm", "start"]
