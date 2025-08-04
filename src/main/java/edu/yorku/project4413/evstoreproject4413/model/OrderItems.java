package edu.yorku.project4413.evstoreproject4413.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore // Prevents infinite recursion
    private Orders order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;


    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal price;

    @Column(columnDefinition = "JSON")
    private String customizations;

    // Automatically set valid default values before persisting
    @PrePersist
    protected void onPersist() {
        if (this.quantity == null || this.quantity < 1) {
            this.quantity = 1;
        }
        if (this.price == null) {
            this.price = BigDecimal.ZERO;
        }
        if (this.customizations == null) {
            this.customizations = "{}"; // Empy JSON isted of null
        }
    }

    // Constructors
    public OrderItems() {}

    public OrderItems(Orders order, Vehicle vehicle, Integer quantity, BigDecimal price, String customizations) {
        this.setOrder(order);
        this.vehicle = vehicle;
        this.quantity = quantity != null ? quantity : 1;
        this.price = price != null ? price : BigDecimal.ZERO;
        this.customizations = (customizations != null) ? customizations : "{}";
    }

    // Getters and Setters
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public Orders getOrder() { return order; }
    public void setOrder(Orders order) {
        if (this.order != null) {
            this.order.getOrderItems().remove(this);
        }
        this.order = order;
        if (order != null && !order.getOrderItems().contains(this)) {
            order.getOrderItems().add(this);
        }
    }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCustomizations() { return customizations; }
    public void setCustomizations(String customizations) {
        this.customizations = (customizations != null) ? customizations : "{}";
    }
}
