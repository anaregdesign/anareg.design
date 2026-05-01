# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY tailwind.config.ts vite.config.ts react-router.config.ts ./

COPY app/ app/

COPY public/ public/

RUN npm ci && npm run build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./

COPY --from=builder /app/build ./build

RUN npm ci --omit=dev

ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080

CMD ["npm", "start"]
