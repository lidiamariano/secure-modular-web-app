package main

import (
	"github.com/gin-gonic/gin"
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/middleware"
	"backend/internal/routes"
)

func main() {
	// Carrega configurações do .env
	cfg := config.LoadConfig()

	// Inicializa banco de dados
	database.InitDB(cfg)

	// Cria instância do router com logger e recovery
	router := gin.Default()

	// Aplica CORS middleware
	router.Use(middleware.CORSMiddleware())

	// Registra rotas
	routes.RegisterRoutes(router)

	// Inicia servidor
	router.Run(":8080")
}
