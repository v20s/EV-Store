package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.dto.CheckoutDTO;
import edu.yorku.project4413.evstoreproject4413.dto.OrderDTO;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import edu.yorku.project4413.evstoreproject4413.service.OrderService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    // Extracts the authenticated user from JWT
    private User getUserFromToken(String token) {
        try {
            byte[] decodedKey = Base64.getDecoder().decode(jwtSecret);
            SecretKey key = Keys.hmacShaKeyFor(decodedKey);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody();
            return userRepository.findByEmail(claims.getSubject())
                    .orElse(null); // Returns null if user is not found
        } catch (Exception e) {
            return null;
        }
    }

    // Retrieves all orders of the authenticated user
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(orderService.getUserOrders(user.getUserId()));
    }

    // Checkout order for the logged-in user
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestHeader("Authorization") String token,
                                      @RequestBody CheckoutDTO checkoutDTO) {
        User user = getUserFromToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Please log in.");
        }

        checkoutDTO.setUserId(user.getUserId());

        try {
            OrderDTO orderDTO = orderService.checkout(checkoutDTO);
            return ResponseEntity.ok(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing checkout: " + e.getMessage());
        }
    }

    // Get currently authenticated user dynamically
    @GetMapping("/me")
    public ResponseEntity<User> getAuthenticatedUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Unauthorized
        }
        Optional<User> user = userRepository.findByEmail(userDetails.getUsername());
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
