package edu.yorku.project4413.evstoreproject4413.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.repository.OrderRepository;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;

@RestController
@RequestMapping("/api/orders")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class UserOrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    
     //Get orders dynamically based on logged-in user
     
    @GetMapping("/my-orders/user")
    public ResponseEntity<List<Orders>> getUserOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized if no user is logged in
        }

        // Retrieve the user by email 
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch user's orders
        List<Orders> orders = orderRepository.findByUser(user);
        return ResponseEntity.ok(orders);
    }
}
