FROM node

WORKDIR /server/

COPY package-lock.json package.json /server/

RUN npm install

COPY . /server/

CMD ["npm", "run", "dev"]