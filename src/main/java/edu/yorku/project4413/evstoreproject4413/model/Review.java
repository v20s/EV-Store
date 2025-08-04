package edu.yorku.project4413.evstoreproject4413.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Matches database column name
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false, length = 1000)
    private String reviewText;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Automatically set `createdAt` before persisting
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getReviewId() { return reviewId; }
    public void setReviewId(Long reviewId) { this.reviewId = reviewId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public int getRating() { return rating; }
    public void setRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5.");
        }
        this.rating = rating;
    }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
