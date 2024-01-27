FROM node:20-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm ci --include=dev
COPY . .

ARG TARGET_ENV=production
RUN cp .env.${TARGET_ENV} .env.production || true

RUN npm run build

FROM node:20-alpine
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/dist /app/public

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "public", "-l", "3000"]
