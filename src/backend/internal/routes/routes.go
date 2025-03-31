package routes

import (
	"github.com/gin-gonic/gin"
	"backend/internal/controllers"
	"backend/internal/middleware"
)

func RegisterRoutes(router *gin.Engine) {
	// Rotas públicas
	router.POST("/login", controllers.Login)
	router.POST("/register", controllers.RegisterUser)
	router.GET("/products", controllers.ListProducts)

	// Rotas protegidas
	auth := router.Group("/api")
	auth.Use(middleware.JWTAuthMiddleware())
	{
		auth.POST("/products", controllers.CreateProduct)
		auth.PUT("/products/:id", controllers.UpdateProduct)
		auth.DELETE("/products/:id", controllers.DeleteProduct)

		auth.GET("/users", controllers.ListUsers)
		auth.PUT("/users/:id", controllers.UpdateUser)
		auth.DELETE("/users/:id", controllers.DeleteUser)

	}
}
