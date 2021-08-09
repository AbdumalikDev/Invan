FROM node:latest

WORKDIR /user/src/invan

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]