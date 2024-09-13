# SWE-Fall24
Full Stack SWE App for Fall 24

# Versions
node: `v22.3.0`
npm: `10.8.1`
nvm: `1.1.12`

# Building & Running
In order to build this project, you will need Docker-Compose. On Windows, Docker Compose comes with Docker Engine. On Linux, Docker Compose can be installed manually via command line.

In order to start the entire project, run `docker-compose up --build -d` in the `SWE-Fall24` directory. This should start up the `wtm-mongodb`, `wtm-react`, `wtm-express` containers, and a network between them. 

## Starting the Back-End Locally:
- Make sure you have the database container running: `docker-compose up wtm-mongodb -d`
- In `SWE-Fall24/wtm-express`, run `npm i`.
- Run `npm start`.
- Back-end test cases can be run with the command `npm test` while in `SWE-Fall24/wtm-express`.

## Starting the Front-End Locally:
- In `SWE-Fall24/wtm-react`, run `npm i`.
- Run `npm start`.