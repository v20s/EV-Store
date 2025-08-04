package edu.yorku.project4413.evstoreproject4413.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Map;

@Entity
@Table(name = "cart_items")
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @Column(nullable = false)
    private Long vehicleId;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false) // 
    private BigDecimal price;  // 

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> customizations;

    // Getters and setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

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

    public Map<String, Object> getCustomizations() {
        return customizations;
    }

    public void setCustomizations(Map<String, Object> customizations) {
        this.customizations = customizations;
    }
}
