package edu.yorku.project4413.evstoreproject4413.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonBackReference
    private User user;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItems> cartItems;

    // Getters and setters
    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;  // 
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<CartItems> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItems> cartItems) {
        this.cartItems = cartItems;
    }
}
