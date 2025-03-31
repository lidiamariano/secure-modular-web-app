func ListProducts(c *gin.Context) {
    products, err := services.GetAllProducts()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch products"})
        return
    }
    c.JSON(http.StatusOK, products)
}
