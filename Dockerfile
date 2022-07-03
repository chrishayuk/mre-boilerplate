# this will build the dev dependencies
FROM node:lts AS dev-dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# this will build the production dependencies
FROM node:lts AS prod-dependencies
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev

# create the build
FROM node:lts AS builder
WORKDIR /app
COPY ./public/ /app/public/
COPY ./src/ /app/src/
COPY ./.eslint* /app/.
COPY ./.prettierrc /app/.
COPY ./tsconfig.json /app/.
COPY --from=dev-dependencies /app/node_modules/ /app/node_modules/
COPY --from=dev-dependencies /app/package*.json /app/.
RUN npm run build

# create the production image from distroless
#FROM gcr.io/distroless/nodejs:16 as production
FROM node:lts-buster-slim as production

# setup environment variables
ENV PORT=80
ENV BASE_URL=http://chuk-hello-mre.uksouth.azurecontainer.io/

# set the work dir
WORKDIR /app

# copy the application
COPY --from=prod-dependencies /app/node_modules/ /app/node_modules/
COPY --from=prod-dependencies /app/package*.json /app/.
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/public/ /app/public/

# Expose PORT
EXPOSE $PORT

# fire it up
CMD ["node", "/app/dist/server.js"]