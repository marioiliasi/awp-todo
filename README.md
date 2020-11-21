# AWP Project - Todo List
This is a simple TODO List project for the university. It uses client server architecture. Both client & server + database can be run separately inside a docker container. There is a Dockerfile for each of them.

### Environment
You need to have Docker installed. If you're running on a Windows machine you would need to expose daemon on tcp for localhost without tls. So if you would like to run this on a production environment I would suggest using an SSL certificate & change the endpoints to HTTPS for security

### Server
The server is wrote in NodeJs with a MongoDB database & expose an api with all the CRUD functionality needed.
It also offers a registration/login functionality.
In order to start the server you need to:
- go under /server directory and run `docker build . -t todo:server`. This command will build the docker image (install nodejs, copy the project data to the image, installing dependencies, expose 3000 port for the node app)
- go under /server/mongo directory and run `docker build . -t todo:mongo`. This command will build the docker image for the MongoDB database exposing 27017 port
If you want to run the containers just run:
- `docker network create --driver bridge isolated-todo` for creating a bridge network between the containers so they can communicate to each other - this command should be run just once not everytime when you run the application
- `docker volume create --name=mongodata` for creating a volume called `mongodata` so that the data will be persisted after container restart
- `docker run -it -p 27017:27017 --network=isolated-todo -v mongodata:/data/db --name mongo todo:mongo` for starting the MongoDB database on localhost on port 27017
- `docker run -it -p 3000:3000 --network=isolated-todo --link=mongo --name server todo:server` for starting the NodeJs server on localhost on port 3000 (if you want a different configuration create a configuration file for docker or pass the env variables to the run command & modify the code to pass the env variables)
- in order to `STOP` the containers from running open a new terminal & run `docker stop server` & `docker rm server` and `docker stop mongo` & `docker rm mongo`. You need to run these commands each time you want to start/restart your containers
If you want to start these as in detached mode just pass `-d` after `run` keyword to send the process in background. In order to kill the processes later just use docker ps to retrieve the processes & then run `docker stop `'`id_of_container'`
In order to check that the server has started go to http://localhost:3000/ & you should receive an 'Up!' message in the browser.
### Client


Contributors: Mario Iliasi, Vlad Voicu, Bogdan Rosca
