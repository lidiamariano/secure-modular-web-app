package controllers

import (
    "net/http"
    "backend/internal/services"
    "backend/internal/models"
    "github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
    var input struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    // Vincular JSON do corpo à estrutura input
    if err := c.BindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }
    // Chamar service para autenticar
    token, err := services.AuthenticateUser(input.Email, input.Password)
    if err != nil {
        // Retornar 401 se credenciais inválidas
        c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }
    // Sucesso: retornar o token JWT
    c.JSON(http.StatusOK, gin.H{"token": token})
}
