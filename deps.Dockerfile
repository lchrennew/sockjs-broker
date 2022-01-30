FROM node:16.0-alpine3.13
COPY package.json build.sh babel.config.js start.sh .env .env.local ./
RUN sh build.sh
