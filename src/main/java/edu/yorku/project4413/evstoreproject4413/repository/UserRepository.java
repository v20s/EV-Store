package edu.yorku.project4413.evstoreproject4413.repository;

import edu.yorku.project4413.evstoreproject4413.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Method to find a user by their email
	Optional<User> findByEmail(String email); 

    // Custom method to check if a user already exists by email
    boolean existsByEmail(String email); // Automatically implemented by Spring Data JPA
}
