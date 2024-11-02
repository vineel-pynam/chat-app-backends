FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

COPY .docketignore /app/.dockerignore

CMD ["npm", "run", "start"]