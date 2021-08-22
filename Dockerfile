FROM node:lts

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY package-lock.json package.json ./

RUN npm ci

COPY . .

CMD ["node", "index.js"]
