package edu.yorku.project4413.evstoreproject4413.dto;

import java.math.BigDecimal;

public class OrderItemDTO {
    private Long vehicleId;
    private Integer quantity;
    private BigDecimal price;
    private String customizations;

    // Getters and Setters
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

    public String getCustomizations() {
        return customizations;
    }

    public void setCustomizations(String customizations) {
        this.customizations = customizations;
    }
}
