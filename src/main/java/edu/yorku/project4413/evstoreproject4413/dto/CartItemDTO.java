package edu.yorku.project4413.evstoreproject4413.dto;

import java.math.BigDecimal;
import java.util.Map;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CartItemDTO {
	@NotNull(message = "Vehicle ID is required")
    private Long vehicleId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private Map<String, Object> customizations;  
    private BigDecimal price; 
    
    private Long cartItemId;
    
   


    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    
    // Getters and setters
    public Long getVehicleId() {
        return vehicleId;
    }
    
    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public BigDecimal getPrice() {  
        return price;
    }

    public void setPrice(BigDecimal price) {  
        this.price = price;
    }

    public Map<String, Object> getCustomizations() { return customizations; }
    public void setCustomizations(Map<String, Object> customizations) { this.customizations = customizations; }
}