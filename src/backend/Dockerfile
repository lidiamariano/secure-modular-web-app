# Etapa 1: Build
FROM golang:1.23-alpine AS builder
WORKDIR /app

# Copiar go.mod e go.sum e baixar dependências (cache build de deps)
COPY go.mod go.sum ./
RUN go mod download

# Copiar código-fonte e compilar o binário
COPY . .

# Verifica se o diretório e arquivos existem antes do build (depuração opcional)
RUN ls -R /app

# Compila o binário (usando ./cmd se for um pacote)
RUN go build -o server .

# Etapa 2: Runtime
FROM alpine:3.18
WORKDIR /app

# Copiar apenas o binário compilado da etapa 1
COPY --from=builder /app/server ./

# Porta em que a aplicação escuta (por convenção, não necessário para funcionar)
EXPOSE 8080 

# Comando de execução do container
CMD ["./server"]
