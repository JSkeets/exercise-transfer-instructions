FROM node:8

RUN mkdir -p /transfer-instructions-exercise
WORKDIR /transfer-instructions-exercise

COPY package.json /transfer-instructions-exercise

RUN npm install

COPY . /transfer-instructions-exercise
