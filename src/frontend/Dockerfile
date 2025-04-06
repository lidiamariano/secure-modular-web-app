# Etapa 1: Build do Frontend
FROM node:18 AS builder

WORKDIR /app

# Copia os arquivos de dependência e instala-os
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante dos arquivos e realiza o build
COPY . .
RUN npm run build

# Etapa 2: Imagem final que mantém os arquivos estáticos e fica rodando
FROM alpine:latest

# Cria o diretório onde serão armazenados os arquivos de build
WORKDIR /app

# Copia a pasta de build do estágio anterior para a pasta 'dist'
COPY --from=builder /app/dist ./dist

# Comando para manter o container ativo (evita que ele saia e reinicie)
CMD ["tail", "-f", "/dev/null"]
