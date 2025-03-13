# Stage 1: Base environment
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Build the React app
FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
COPY . ./
RUN pnpm run build

# Stage 4: Development environment
FROM base AS development
COPY --from=deps /app/node_modules /app/node_modules
COPY . ./

EXPOSE 5173
CMD ["pnpm", "run", "dev"]

# Stage 5: Production environment
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]