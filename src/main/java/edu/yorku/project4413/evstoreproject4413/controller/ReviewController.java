package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.dto.ReviewDTO;
import edu.yorku.project4413.evstoreproject4413.model.Review;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.model.Vehicle;
import edu.yorku.project4413.evstoreproject4413.repository.ReviewRepository;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import edu.yorku.project4413.evstoreproject4413.repository.VehicleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleRepository vehicleRepository;
    @PostMapping("/add")
    public ResponseEntity<String> addReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ReviewDTO reviewDTO) {

        System.out.println(" Received request to add a review");

        if (userDetails == null) {
            System.out.println(" No authenticated user detected.");
            return ResponseEntity.status(401).body("Unauthorized: Please log in.");
        }

        System.out.println(" Authenticated User: " + userDetails.getUsername());

        // Fetch user by email (Make sure it's a managed entity)
        User user = userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found in DB"));

        System.out.println(" Managed User found: " + user.getEmail());

        // Validate vehicle
        if (reviewDTO.getVehicleId() == null) {
            System.out.println(" Vehicle ID missing in review request.");
            return ResponseEntity.badRequest().body("Vehicle ID must not be null.");
        }

        // Fetch vehicle (Managed Entity)
        Vehicle vehicle = vehicleRepository.findById(reviewDTO.getVehicleId())
            .orElseThrow(() -> new RuntimeException("Vehicle not found in DB"));

        System.out.println(" Vehicle found: " + vehicle.getModel());

        // Convert DTO to Entity
        Review review = new Review();
        review.setUser(user);  // Managed entity
        review.setVehicle(vehicle);  // Managed entity
        review.setRating(reviewDTO.getRating());
        review.setReviewText(reviewDTO.getReviewText());

        // Save review (Hibernate recognizes the user & vehicle as managed)
        reviewRepository.save(review);
        System.out.println(" Review submitted successfully.");

        return ResponseEntity.ok("Review submitted successfully.");
    }




    // Get reviews by vehicle
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByVehicle(@PathVariable Long vehicleId) {
        System.out.println("🔍 Fetching reviews for vehicle ID: " + vehicleId);
        List<Review> reviews = reviewRepository.findByVehicle_VehicleId(vehicleId);
        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> new ReviewDTO(review))
                .collect(Collectors.toList());

        System.out.println(" Found " + reviewDTOs.size() + " reviews for vehicle ID: " + vehicleId);
        return ResponseEntity.ok(reviewDTOs);
    }

    // Get authenticated user's reviews
    @GetMapping("/my-reviews")
    public ResponseEntity<List<ReviewDTO>> getUserReviews() {
        System.out.println(" Fetching reviews for authenticated user");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println(" No authenticated user detected.");
            return ResponseEntity.status(401).build();
        }

        String userEmail = authentication.getName();
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            System.out.println(" User not found in database.");
            return ResponseEntity.notFound().build();
        }

        List<Review> userReviews = reviewRepository.findByUser_UserId(user.get().getUserId());
        System.out.println(" Found " + userReviews.size() + " reviews for user.");

        // Convert Review entities to DTOs
        List<ReviewDTO> reviewDTOs = userReviews.stream()
                .map(review -> new ReviewDTO(review))
                .collect(Collectors.toList());

        return ResponseEntity.ok(reviewDTOs);
    }
}
