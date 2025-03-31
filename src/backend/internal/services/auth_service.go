package services

import (
	"errors"

	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/utils"
)

func RegisterUser(user *models.User) error {
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword
	return database.DB.Create(user).Error
}

func Login(email, password string) (string, error) {
	var user models.User
	db := database.DB
	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		return "", errors.New("Usuário não encontrado")
	}

	if !utils.CheckPasswordHash(password, user.Password) {
		return "", errors.New("Senha incorreta")
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		return "", errors.New("Erro ao gerar token")
	}

	return token, nil
}