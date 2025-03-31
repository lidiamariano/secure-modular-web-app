# Etapa 1: Build
FROM golang:1.20-alpine AS builder
WORKDIR /app

# Copiar go.mod e go.sum e baixar dependências (cache build de deps)
COPY go.mod go.sum ./
RUN go mod download

# Copiar código-fonte e compilar o binário
COPY . .
RUN go build -o server cmd/main.go  # assumindo main.go está em cmd/, ajuste caminho se necessário

# Etapa 2: Runtime
FROM alpine:3.18
WORKDIR /app
# Copiar apenas o binário compilado da etapa 1
COPY --from=builder /app/server ./
# Porta em que a aplicação escuta (por convenção, não necessário para funcionar)
EXPOSE 8080 
# Comando de execução do container
CMD ["./server"]
