# Toronto Community Employment Services (TCES)

Clone this repository, install Node.JS and run this command in the root directory:

## Development

1. Ensure your local files are synced with any updates on GitHub
2. Make a copy of `.env.example` called `.env`, fill in all empty fields.
3. Run the following commands in the main directory (make sure Docker is running!):

```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

and navigate to http://localhost:3000/ to view your local version of the website!

Next, install docker and run this command in the root directory:

`docker compose up`
