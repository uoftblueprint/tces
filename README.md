# Toronto Community Employment Services (TCES)

# Setup
* Install Node.js
* Install Docker

## Development
1. Ensure your local files are synced with any updates on GitHub
2. Run the following commands in the main directory (make sure Docker is running!):
```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```
and navigate to http://localhost:3000/ to view your local version of the website!

* The `build` command should be ran after any packages are installed, so to be safe, run it every time you pull from GitHub (and whenever you install new packages).
* Hot reloading is enabled for React, meaning you can make changes to your files, save them, and they'll be reflected on localhost.
* If stuff seems really broken, run `docker system prune -a` then the usual command (there's probably a more efficient way to do this)
* Sometimes you need a `-V` at the end of the command but idk

## Pushing Working Changes
1. Make sure your changes are working
2. Make sure you are on an appropriate branch
    * To view existing branches: `git branch`
    * To switch to an existing branch: `git checkout <branch_name>`
    * To create a new branch and switch to it: `git checkout -b <branch_name>`
3. Add the appropriate files to commit: `git add <file_name>`
4. Create a new commit: `git commit -m "quality message"`
5. Push the commit to GitHub: `git push`
