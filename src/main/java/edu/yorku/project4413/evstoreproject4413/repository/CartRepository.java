package edu.yorku.project4413.evstoreproject4413.repository;

import edu.yorku.project4413.evstoreproject4413.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

   
    Optional<Cart> findByUser_UserId(Long userId);
}
