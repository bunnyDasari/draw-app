FROM node:alpine

WORKDIR /app/DrawRoom

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]

