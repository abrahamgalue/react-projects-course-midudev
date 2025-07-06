FROM node:22-alpine

WORKDIR /app

COPY . ./

RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]