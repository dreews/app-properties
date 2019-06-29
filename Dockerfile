FROM node:10.15.0-alpine

WORKDIR /app

COPY . .

RUN npm install --quiet

EXPOSE 3000
