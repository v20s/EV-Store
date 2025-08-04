package edu.yorku.project4413.evstoreproject4413.dto;

import java.util.List;

public class CheckoutDTO {
    private Long userId;
    private String paymentMethod;
    private List<OrderItemDTO> items; // Includes customizations

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}
