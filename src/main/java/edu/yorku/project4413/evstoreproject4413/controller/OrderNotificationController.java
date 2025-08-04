package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.repository.OrderRepository;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class OrderNotificationController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // Confirm Order - Authenticated user only
    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmOrder(
            @AuthenticationPrincipal UserDetails userDetails, // Extract authenticated user
            @RequestBody Map<String, String> request) {
        
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: Please log in."));
        }

        Optional<User> user = userRepository.findByEmail(userDetails.getUsername());
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found."));
        }

        String orderId = request.get("orderId");
        if (orderId == null || orderId.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Order ID is required."));
        }

        Optional<Orders> order = orderRepository.findById(Long.parseLong(orderId));
        if (order.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Order not found."));
        }

        if (!order.get().getUser().equals(user.get())) {
            return ResponseEntity.status(403).body(Map.of("error", "Forbidden: You can only confirm your own orders."));
        }

        // Mock notification integrate with an actual notification service
        return ResponseEntity.ok(Map.of("message", "Order " + orderId + " has been confirmed!"));
    }
}
