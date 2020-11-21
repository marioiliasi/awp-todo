FROM alpine:latest

USER root

RUN apk add --update nodejs npm

RUN node -v

RUN npm install -g @angular/cli
RUN npm install -g typescript

ADD frontend /frontend
WORKDIR /frontend

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
