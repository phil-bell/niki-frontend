FROM node:19-alpine as build

WORKDIR /server/

ENV VITE_NIKI_BACKEND_URL=https://starfish-app-hxdcr.ondigitalocean.app/

COPY package-lock.json package.json /server/

RUN npm install

COPY . /server/

FROM build as dev

CMD ["npm", "run", "dev"]

FROM build as prod

RUN npm run build

# Build command:
# docker build --target dev -t niki-frontend .

# Start command:
# docker run --rm --tty --name niki-frontend -v $(pwd):/server -p 8001:8001 -v /server/node_modules niki-frontend