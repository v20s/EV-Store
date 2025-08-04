package edu.yorku.project4413.evstoreproject4413.security;

import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.service.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final SecretKey signingKey;
    private final TokenBlacklistService tokenBlacklistService;  

    public JwtTokenFilter(@Value("${jwt.secret}") String jwtSecret, TokenBlacklistService tokenBlacklistService) {
        // Decode and ensure correct key size
        byte[] decodedKey = Base64.getDecoder().decode(jwtSecret);
        this.signingKey = Keys.hmacShaKeyFor(decodedKey);
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authorizationHeader = Optional.ofNullable(request.getHeader("Authorization")).orElse("");

        if (authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            System.out.println(" Extracted Token: " + token);

            // Check if token is blacklisted
            if (tokenBlacklistService.isTokenBlacklisted(token)) {
                System.out.println("Token is blacklisted! Blocking request.");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is blacklisted. Please log in again.");
                return;
            }

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(signingKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                String email = claims.getSubject();
                List<String> roles = claims.get("roles", List.class);

                System.out.println(" Authenticated User: " + email);
                System.out.println(" Extracted Roles: " + roles);
                System.out.println(" Request Path: " + request.getRequestURI());
                System.out.println(" HTTP Method: " + request.getMethod());

                if (roles == null || roles.isEmpty()) {
                    System.out.println(" Token does not contain valid roles. Blocking request.");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token: Missing roles.");
                    return;
                }

                // Convert roles to Spring Security authorities
                List<SimpleGrantedAuthority> authorities = roles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                System.out.println(" Assigned Authorities: " + authorities);

                //  Correct instantiation of UserDetails
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        email, "", authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println(" Security context set for user: " + email);

            } catch (Exception e) {
                System.out.println("Invalid JWT: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        } else {
            System.out.println("️ No Authorization Header Found. Proceeding as an anonymous request.");
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }

}
