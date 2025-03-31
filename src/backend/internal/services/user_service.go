package services

import (
	"backend/internal/database"
	"backend/internal/models"
)

func ListUsers() ([]models.User, error) {
	var users []models.User
	err := database.DB.Find(&users).Error
	return users, err
}

func UpdateUser(user *models.User) error {
	return database.DB.Save(user).Error
}

func DeleteUser(id uint) error {
	return database.DB.Delete(&models.User{}, id).Error
}
