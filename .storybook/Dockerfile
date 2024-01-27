FROM node:20-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --include=dev
COPY . .
RUN npm run storybook:build

FROM nginx:1.25.3-alpine

COPY --from=builder /app/storybook-static /usr/share/nginx/html

EXPOSE 80
