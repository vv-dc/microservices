FROM node:17.6-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY knexfile.js ./knexfile.js
COPY ./migrations ./migrations
