package edu.yorku.project4413.evstoreproject4413.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.yorku.project4413.evstoreproject4413.model.Review;

import java.time.LocalDateTime;

public class ReviewDTO {

    @JsonProperty("id")
    private Long reviewId;

    @JsonProperty("vehicleId")
    private Long vehicleId;

    @JsonProperty("rating")
    private int rating;

    @JsonProperty("reviewText")
    private String reviewText;

    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    //  Default Constructor 
    public ReviewDTO() {}

    //  Constructor to Convert `Review` Entity to DTO**
    public ReviewDTO(Review review) {
        this.reviewId = review.getReviewId();  
        this.vehicleId = review.getVehicle().getVehicleId();
        this.rating = review.getRating();
        this.reviewText = review.getReviewText();
        this.createdAt = review.getCreatedAt();
    }

    //  Getters and Setters
    public Long getReviewId() { return reviewId; }
    public void setReviewId(Long reviewId) { this.reviewId = reviewId; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
