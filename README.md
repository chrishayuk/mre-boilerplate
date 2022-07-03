# introduction
this is a boilerplate starter kit for the Microsoft Mixed Reality Extensions toolkit.
this is essentially allows you to run custom components in altvr.
i built this template for easy local debugging, so used esbuild as my local build system, with nodemon for hot restars

## run locally
to run locally just type

```
npm run dev:server
```

## build
if you wish to create a local build just type

```
npm run build
```

this will create a build in the ./dist folder.  you can serve with the following command

```
npm run serve
```

# docker build
the following command will build the docker image.

```
DOCKER_BUILDKIT=1 docker build . -t chrishayuk/mre-boilerplate
````

the following will build for mac m1

```
DOCKER_BUILDKIT=1 docker build --platform linux/amd64 . -t chrishayuk/mre-boilerplate
```

# running the docker image
once you've built the docker image, you can run it with the following command

```
docker run --init -p 3901:3901 chrishayuk/mre-boilerplate
```

and for testing m1 build

```
docker run --init --platform linux/amd64 -p 3901:3901 chrishayuk/mre-boilerplate
```

## deploying to azure container registry

## tag the image
you need to tag the image first to your project

```
docker tag chrishayuk/mre-boilerplate chrishayuk.azurecr.io/mre-boilerplate
```

## push the image

```
docker push chrishayuk.azurecr.io/mre-boilerplate
```

## deploy to azure containers

once deployed to azure container registry.
create with the portal
you will need to change the env variables to match your deploy
you can do that in the dockerfile or running env variables

# TODO List
The following is the todo list for this boilerplate

- get working with code sandbox

