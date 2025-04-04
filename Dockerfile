# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY tailwind.config.ts postcss.config.js vite.config.ts ./

COPY app/ app/

COPY public/ public/

RUN npm install && npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package.json ./

COPY --from=builder /app/build ./build

RUN npm install --production

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

CMD ["npm", "start"]
