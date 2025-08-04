package edu.yorku.project4413.evstoreproject4413.service;

import edu.yorku.project4413.evstoreproject4413.exception.DuplicateRegistrationException;
import edu.yorku.project4413.evstoreproject4413.exception.InvalidCredentialsException;
import edu.yorku.project4413.evstoreproject4413.exception.AccountLockedException;
import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.User;
import edu.yorku.project4413.evstoreproject4413.repository.UserRepository;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private AuthenticationService authenticationService;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Transactional
    public void setUserForOrder(Orders order, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        order.setUser(user);
    }

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateRegistrationException("Email already registered. Please use a different email.");
        }

        // Hash the password before saving
        user.setPassword(authenticationService.hashPassword(user.getPassword()));
        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getEmail());
        return "Registration complete. Please log in.";
    }

    public String authenticateUser(String email, String password) {
        if (securityService.isAccountLocked(email)) {
            throw new AccountLockedException("Too many failed attempts. Please try again later.");
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty() || !authenticationService.verifyPassword(password, optionalUser.get().getPassword())) {
            securityService.trackFailedLoginAttempt(email);
            throw new InvalidCredentialsException("Invalid username or password.");
        }

        securityService.clearFailedAttempts(email);
        logger.info("User authenticated successfully: {}", email);
        return "Login successful!";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    //  Now returns Optional<User> to prevent null issues
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
