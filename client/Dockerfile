# pull official base image
FROM node:18.12.0-alpine

# set working directory
WORKDIR /app/client
# add app
COPY . .

# add packages and install them
RUN npm install -g create-react-app
RUN npm ci

# start app
EXPOSE 3000
RUN chown -R node /app/client
USER node
CMD ["npm", "start"]
