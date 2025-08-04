package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.dto.UserDTO;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = users.stream()
                                      .map(UserDTO::new)
                                      .toList();  
        return ResponseEntity.ok(userDTOs);
    }



    // Create new user (Prevents duplicate emails)
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // Prevent duplicate emails
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    // Get user by email (Secure, Only allows logged-in users)
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get currently authenticated user dynamically
    @GetMapping("/me")
    public ResponseEntity<User> getAuthenticatedUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized if no logged-in user
        }
        return userService.findByEmail(userDetails.getUsername())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/id")
    public ResponseEntity<Long> getUserId(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<User> user = userService.findByEmail(userDetails.getUsername());
        return user.map(u -> ResponseEntity.ok(u.getUserId()))
                   .orElse(ResponseEntity.notFound().build());
    }

}
