# TCES (TORONTO COMMUNITY EMPLOYMENT SERVICES)

Toronto Community Employment Services (TCES) is a non-profit charitable organization offering no cost employment services, such as skill assessments, resume building, career counseling, workshops and more!

This app will serve as an internal-use CRM (customer relationship management) application.

Find out more about TCES by visiting the following page: https://toronto-jobs.org/about-us/.

## Wiki

**Contains:**

- Commit, PR and Branching standards
- API Documentation

[Take me to the wiki page!](https://github.com/uoftblueprint/tces/wiki)

## Getting the project set up

1. If you are using **Windows**, you will need to install Windows Subsystem for Linux (WSL) by following the instructions on [this page](https://docs.microsoft.com/en-us/windows/wsl/install-win10). (The "Simplified Installation" section is probably easiest, but you need to join the Windows Insiders Program with a Microsoft account.)

   - If you are given a choice of what operating system to use, select _Ubuntu 20.04_.

2. Install [Docker](https://docs.docker.com/get-docker/).

   - On Windows, make sure you've selected the "WSL 2 backend" tab under "System Requirements" and follow those instructions.
   - On Linux, also follow the instructions on "Manage Docker as a non-root user" [here](https://docs.docker.com/install/linux/linux-postinstall/).

3. If you are using **Windows**, you'll need to open a terminal into the WSL system you installed. _This is the terminal where you'll type in the rest of the commands in this section._

   1. To start the WSL terminal, open the start menu and type in "ubuntu". Click on the "Ubuntu 20.04" application. (We recommend pinning this to your taskbar to make it easier to find in the future.)
   2. Type in the command `pwd`, which shows what folder you're currently in. You should see `/home/<your user name>` printed. If it isn't, switch to your home directory using the command `cd ~`.

4. Clone the tces repo

```
git clone https://github.com/uoftblueprint/tces.git
```

5. Open docker desktop
6. cd into the tces project repo root folder and run `docker compose build`

```
cd tces
docker compose build
```

## Useful docker commands

**Note: each of these commands should be run in the tces project repo root folder**

1. Starting both the frontend and backend app: `docker compose up -d`
2. Opening a terminal on the frontend (after running the container): `docker exec -it react-app /bin/sh`
   - After doing this you can install new dependencies using `npm install <dependency_name>`
   - Update the depnedencies after a pull `npm i`
3. Opening a terminaal on the backend (after running the container): `docker exec -it express-app /bin/sh`
   - After doing this you can install new dependencies using `npm install <dependency_name>`
   - Update the dependencies after a pull `npm i`
4. Running the linter (frontend): `docker compose run react-app npm run lint`
5. Running the formatter (frontend): `docker compose run react-app npm run format`
6. Running the linter (backend): `docker compose run express-app npm run lint`
7. Running the formatter (backend): `docker compose run express-app npm run format`
8. Stopping the containers: `docker compose stop`
9. Removing the container: `docker compose down -v`
10. Removing the images: `docker rmi -f tces-react-app tces-express-app`

## Contributors (2023-24)

- Daniel Dervishi
- Jordan Janakievski
- Emily Zhou
- Kevin Le
- Ron Varshavsky
- Taha Siddiqi
- Selin Tasman
- Grant Hamblin
- Tanmay Shah

## Contributors (2024-25)

- Kashish Mittal
- Harshith Latchupatula
- William Lam

## License

[MIT](https://github.com/uoftblueprint/tces/blob/main/LICENSE)
