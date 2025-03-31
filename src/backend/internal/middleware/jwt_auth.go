package middleware

import (
    "strings"
    "net/http"
    "backend/internal/utils"
    "github.com/gin-gonic/gin"
)

// JWTAuthMiddleware retorna um middleware que valida o token JWT
func JWTAuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Extrai o header Authorization
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing or invalid token"})
            c.Abort()
            return
        }
        // Remove o prefixo "Bearer "
        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        // Valida o token e obtém os claims
        claims, err := utils.ParseJWT(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }
        // Guarda informações do usuário no contexto (ex: ID) para uso nos controllers
        c.Set("user_id", claims.UserID)
        c.Next()  // Token válido; prossegue para o handler da rota
    }
}
