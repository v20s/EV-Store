package edu.yorku.project4413.evstoreproject4413.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String orderStatus;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<OrderItems> orderItems;

 

    // Automatically set `createdAt` before persisting
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructors
    public Orders() {
        this.orderItems = new ArrayList<>();
    }

    public Orders(User user, BigDecimal totalAmount, String orderStatus, String paymentMethod) {
        this.user = user;
        this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO;
        this.orderStatus = orderStatus;
        this.paymentMethod = paymentMethod;
        this.orderItems = new ArrayList<>();
    }

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { 
        this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO; 
    }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<OrderItems> getOrderItems() {
        if (this.orderItems == null) {
            this.orderItems = new ArrayList<>();
        }
        return orderItems;
    }

    public void setOrderItems(List<OrderItems> orderItems) {
        this.orderItems = orderItems;
    }

    public void addOrderItem(OrderItems orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
}
