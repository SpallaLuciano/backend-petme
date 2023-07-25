FROM node:16-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . ./

RUN --mount=type=bind,target=. \
  --mount=type=secret,id=BUCKET \
  BUCKET=$(cat /run/secrets/BUCKET)
ENV BUCKET ${BUCKET}

RUN --mount=type=bind,target=. \
  --mount=type=secret,id=DATABASE \
  DATABASE=$(cat /run/secrets/DATABASE)
ENV DATABASE ${DATABASE}
  
RUN --mount=type=bind,target=. \
  --mount=type=secret,id=ENCRYPT \
  ENCRYPT=$(cat /run/secrets/ENCRYPT)
ENV ENCRYPT ${ENCRYPT}

RUN --mount=type=bind,target=. \
  --mount=type=secret,id=MAILER \
  MAILER=$(cat /run/secrets/MAILER)
ENV MAILER ${MAILER}

RUN npm install
RUN npm run build -S

EXPOSE 3000

CMD ["node", "dist/src/main.js"]