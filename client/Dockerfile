FROM node:17.6-alpine AS build
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=yarn.lock,target=yarn.lock \
  yarn --frozen-lockfile

ARG BACKEND_HOST
ENV BACKEND_HOST=$BACKEND_HOST

COPY public public
RUN --mount=type=bind,source=src,target=src \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=rollup.config.js,target=rollup.config.js \
  yarn build

FROM nginx:1.21.6-alpine AS production
COPY --from=build /usr/src/app/public /usr/share/nginx/html
