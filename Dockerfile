FROM node:16-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . ./

ENV PORT=${PORT}
ENV FRONT_HOST=${FRONT_HOST}
ENV DATABASE=${DATABASE}
ENV ENCRYPT=${ENCRYPT}
ENV JWT=${JWT}
ENV HASH=${HASH}
ENV BUCKET=${BUCKET}
ENV MAILER=${MAILER}

RUN npm install
RUN npm run build -S

EXPOSE 3000

CMD ["node", "dist/src/main.js"]