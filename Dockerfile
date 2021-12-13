FROM docker.io/node:16-alpine

LABEL maintainer="dominic@domm.me" \
      description="Wolke Bot Docker image"

RUN apk update 
RUN apk add --no-cache git

WORKDIR /opt/miaou

COPY . .

RUN npm i 
RUN npm run lint
RUN npm run build

CMD ["npm", "run", "start"]
