package services

import (
    "errors"
    "backend/internal/models"
    "backend/internal/utils"
    "backend/internal/database"
)

// AuthenticateUser verifica credenciais e retorna um token JWT se válidas
func AuthenticateUser(email string, password string) (string, error) {
    var user models.User
    // Buscar usuário por email no banco
    result := database.DB.Where("email = ?", email).First(&user)
    if result.Error != nil {
        return "", errors.New("user not found")
    }
    // Verificar senha
    if !utils.CheckPasswordHash(password, user.Password) {
        return "", errors.New("incorrect password")
    }
    // Gerar token JWT com ID do usuário
    token, err := utils.GenerateJWT(user.ID)
    if err != nil {
        return "", errors.New("failed to generate token")
    }
    return token, nil
}
