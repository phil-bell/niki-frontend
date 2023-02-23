FROM node:19-alpine as build

WORKDIR /server/

COPY package-lock.json package.json /server/

RUN npm install

COPY . /server/

# Build command:
# docker build --target dev -t niki-frontend .

# Start command:
# docker run --rm --tty --name niki-frontend -v $(pwd):/server -p 8001:8001 -v /server/node_modules niki-frontend