package services

import (
	"backend/internal/database"
	"backend/internal/models"
)

func CreateProduct(product *models.Product) error {
	return database.DB.Create(product).Error
}

func ListProducts() ([]models.Product, error) {
	var products []models.Product
	err := database.DB.Find(&products).Error
	return products, err
}

func UpdateProduct(product *models.Product) error {
	return database.DB.Save(product).Error
}

func DeleteProduct(id uint) error {
	return database.DB.Delete(&models.Product{}, id).Error
}