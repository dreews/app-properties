FROM node:10.15.0-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install --quiet

EXPOSE 3000
