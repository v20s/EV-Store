package edu.yorku.project4413.evstoreproject4413.service;

import edu.yorku.project4413.evstoreproject4413.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
public class AuthenticationService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());

        //  Ensure role is correctly assigned 
        String role = (user.getRole() == null || user.getRole().trim().isEmpty()) ? "ROLE_USER" : user.getRole();
        claims.put("roles", List.of(role));

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getClass().getSimpleName()); // More specific error logging
            return false;
        }
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Base64 decoding for proper HMAC key
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));
    }

    public String hashPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }

    public boolean verifyPassword(String inputPassword, String hashedPassword) {
        return new BCryptPasswordEncoder().matches(inputPassword, hashedPassword);
    }

    public void invalidateToken(String token) {
        // Implement token invalidation logic if needed
    }
}
