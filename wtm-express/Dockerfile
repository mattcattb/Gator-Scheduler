FROM node:22.3.0

WORKDIR /usr/src/app

#Transport the packages over
COPY package*.json ./
COPY tsconfig.json ./

#Transport the environment over
COPY .env ./

#Install packages for efficiency
RUN npm install

# Move all source code to image
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]