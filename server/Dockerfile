FROM alpine:latest

USER root

RUN apk add --update nodejs npm

RUN node -v

ADD app /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install
EXPOSE 3000

CMD ["node", "app.js"]