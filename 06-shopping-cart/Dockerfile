FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . ./

RUN pnpm install \
    && pnpm install -g serve \
    && pnpm run build \
    && rm -fr node_modules

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]