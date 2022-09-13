FROM node

WORKDIR /niki-frontend/

COPY package-lock.json package.json /niki-frontend/
COPY package.json

RUN npm install

COPY . /niki-frontend/

CMD ["npm", "run", "dev"]