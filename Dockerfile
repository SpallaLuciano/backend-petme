FROM node:16-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . ./

RUN npm install
RUN npm run build -S

EXPOSE 3000

CMD ["node", "dist/src/main.js"]