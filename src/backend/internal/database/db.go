package database

import (
    "fmt"
    "log"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "backend/internal/config"
    "backend/internal/models"
)

var DB *gorm.DB  // Instância global do GORM

func InitDB(cfg config.Config) {
    // Monta a string de conexão (DSN) usando os valores de ambiente
    dsn := fmt.Sprintf(
        "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort)
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to the database: %v", err)
    }
    log.Println("Database connected successfully!")
    DB = db

    // (Opcional) Migrar automaticamente as tabelas, conforme os modelos
    DB.AutoMigrate(&models.User{}, &models.Product{})
}
