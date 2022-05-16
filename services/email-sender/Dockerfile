FROM node:17.6-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY src ./src
EXPOSE 5000
CMD ["yarn", "start"]
