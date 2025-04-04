# Etapa 1: Build do Frontend
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Apenas os arquivos de build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
