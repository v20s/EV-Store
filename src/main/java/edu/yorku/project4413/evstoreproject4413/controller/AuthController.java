package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.dto.LoginRequest;
import edu.yorku.project4413.evstoreproject4413.dto.RegisterRequest;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import edu.yorku.project4413.evstoreproject4413.service.TokenBlacklistService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }

        User newUser = new User();
        newUser.setFirstName(registerRequest.getFirstName());
        newUser.setLastName(registerRequest.getLastName());
        newUser.setDateOfBirth(registerRequest.getDateOfBirth());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setRegion(registerRequest.getRegion());
        newUser.setRole("ROLE_USER"); 
        userRepository.save(newUser);
        return ResponseEntity.ok("Registration successful");
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), userOptional.get().getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        User user = userOptional.get(); // Extract User from Optional

        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));

        String token = Jwts.builder()
            .setSubject(user.getEmail())
            .claim("roles", List.of(user.getRole()))
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();

        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid token format");
        }
        String authToken = token.substring(7); // Remove "Bearer " prefix
        tokenBlacklistService.blacklistToken(authToken);
        return ResponseEntity.ok("Logged out successfully.");
    }
}
