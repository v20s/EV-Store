package edu.yorku.project4413.evstoreproject4413.dto;

import java.util.List;

public class CartDTO {
    private Long cartId;
    private Long userId;
    private List<CartItemDTO> items;
    
    // Getters and setters
    public Long getCartId() {
        return cartId;
    }
    
    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public List<CartItemDTO> getItems() {
        return items;
    }
    
    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}