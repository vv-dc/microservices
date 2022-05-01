FROM node:17.6-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY knexfile.js healthcheck.js ./
COPY ./migrations ./migrations
