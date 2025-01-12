# Gator Scheduler
Full Stack application designed for scheduling times to meet with your friends and colleagues, even if everyone has a busy schedule. Built with the mern stack for Fall Intro to Software Engineering class at University of Florida.

![homepage image](/assets/homepage.png)

## Project Overview

Gator-Scheduler is a social-media-like platform that simplifies the process of scheduling meetings. Users can manage their schedules, create events, and find common meeting times with friends.

## Features and Functionality
* Full Authentication and Database Storage with MongoDB.
* User Login verified with JWT Token authentication system.
* Generate personal schedules for users stored in backend.
* Create, Edit, and Delete Events for Users and display them in calendar view
* Create meetings and invite users using friend codes, allowing users to accept or deny invites.
* Manage added users and remove them if needed.
* Displays the best time for all users to meet.

## Tech Stack

**Backend:** Node.js, Express.js
**Frontend:** React, Material UI, Tailwind
**Database:** MongoDB
**Containerization:** Docker, Docker Compose

## Building & Running

### Prerequisites
* **Docker Compose**: On Windows, Docker Compose comes with Docker Engine. On Linux, it can be installed manually. See https://docs.docker.com/engine/install/ubuntu/.

### Setup Instructions

1. **Clone Repo**

2. **Set Enviroment Configurations**
* Create '.env' file in /wtm-express/ with the following:
```plaintext
MONGO_INITDB_ROOT_USERNAME=rootuser
MONGO_INITDB_ROOT_PASSWORD=[REDACTED]
MONGO_URI=mongodb://rootuser:[REDACTED]@wtm-mongodb:27017/admin
LOCAL_MONGO_URI=mongodb://rootuser:[REDACTED]@localhost:12345/admin
MONGO_INITDB_DATABASE=lamdb
PORT=3004
JWT_SECRET=pAonqkN/rorjS7sXd3ngJHXZJ8bjWVIMA9ZmJPRET8o=
```

3. **Build and Start Project**
```sh
docker compose up --build d
```
This command starts the wtm-mongodb, wtm-react, wtm-express containers, and establishes a network between them

### Local Setup

1. Make sure mongodb container is running:
```
docker compose up wtm-mongodb -d
```

2. create .env file
``` bash
cd wtm-express
```
.env file should look like 
```
MONGO_INITDB_ROOT_USERNAME=rootuser
MONGO_INITDB_ROOT_PASSWORD=[REDACTED]
MONGO_URI=mongodb://rootuser:[REDACTED]@wtm-mongodb:27017/admin
LOCAL_MONGO_URI=mongodb://rootuser:[REDACTED]@localhost:12345/admin
MONGO_INITDB_DATABASE=lamdb
PORT=3004
JWT_SECRET=pAonqkN/rorjS7sXd3ngJHXZJ8bjWVIMA9ZmJPRET8o=
```

3. install dependencies and start server
```bash
cd wtm-express
npm install
npm start
```

4. go to frontend and startup servers 
```bash
cd wtm-react
npm install
npm start
```
