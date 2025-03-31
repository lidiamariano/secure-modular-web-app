package models

import "gorm.io/gorm"

type User struct {
    gorm.Model        // Embute campos ID, CreatedAt, UpdatedAt, DeletedAt
    Name       string `json:"name"`
    Email      string `gorm:"unique;not null" json:"email"`
    Password   string `gorm:"not null" json:"-"`  // "json:-" para não expor o hash
}
