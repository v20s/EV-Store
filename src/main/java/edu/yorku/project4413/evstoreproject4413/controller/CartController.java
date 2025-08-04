package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.dto.*;
import edu.yorku.project4413.evstoreproject4413.model.*;
import edu.yorku.project4413.evstoreproject4413.repository.*;
import edu.yorku.project4413.evstoreproject4413.service.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;

import java.security.Principal;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000") // Enables frontend connection
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    // Improved JWT token handling
    private Optional<User> getUserFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody();
            return userRepository.findByEmail(claims.getSubject()); 
        } catch (Exception e) {
            logger.error("Invalid JWT Token: {}", e.getMessage());
            return Optional.empty();
        }
    }

    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(@RequestHeader("Authorization") String token, @RequestBody CartItemDTO itemDTO) {
        Optional<User> user = getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(cartService.addToCart(user.get().getUserId(), itemDTO));
    }

    //  Get user's cart
    @GetMapping("/my-cart")
    public ResponseEntity<CartDTO> getCart(@RequestHeader("Authorization") String token) {
        Optional<User> user = getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(cartService.getCart(user.get().getUserId()));
    }

    @DeleteMapping("/remove-item/{cartItemId}")
    public ResponseEntity<CartDTO> removeFromCartByItemId(
        @RequestHeader("Authorization") String token,
        @PathVariable Long cartItemId
    ) {
        Optional<User> user = getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(cartService.removeFromCartByItemId(user.get().getUserId(), cartItemId));
    }


    // Clear the entire cart
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String token) {
        Optional<User> user = getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        cartService.clearCart(user.get().getUserId());
        return ResponseEntity.ok().build();
    }

    // Checkout process
    @PostMapping("/checkout")
    public ResponseEntity<String> completeCheckout(@RequestHeader("Authorization") String token,
                                                   @RequestBody CheckoutRequest request) {
        Optional<User> optionalUser = getUserFromToken(token);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = optionalUser.get();
        double totalAmount = request.getFinalTotal();
        double tax = request.getTaxAmount();
        double shipping = request.getShippingCost();
        

        // Debug log
        System.out.println("Received items: ");
        request.getItems().forEach(item -> {
            System.out.println("vehicleId: " + item.getVehicleId());
            System.out.println("quantity: " + item.getQuantity());
            System.out.println("price: " + item.getPrice());
            System.out.println("customizations: " + item.getCustomizations());
        });


        orderService.completeCheckout(user, totalAmount, tax, shipping, request.getItems());

        return ResponseEntity.ok("Order completed successfully");
    }


}
