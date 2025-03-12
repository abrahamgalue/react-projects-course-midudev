# Stage 1: Build the React app
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:22-alpine AS development
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . ./

EXPOSE 5173
CMD ["npm", "run", "dev"]

# Stage 3: Production environment
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 4: Test environment
FROM node:20-bookworm AS generate-tests
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
RUN npx -y playwright@1.51.0 install --with-deps

COPY . ./

RUN npx playwright test

# Stage 5: Test reports (Nginx)
FROM nginx:stable-alpine AS test

COPY --from=generate-tests /app/playwright-report /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]