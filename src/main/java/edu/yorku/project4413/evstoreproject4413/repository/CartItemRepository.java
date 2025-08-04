package edu.yorku.project4413.evstoreproject4413.repository;
import edu.yorku.project4413.evstoreproject4413.model.CartItems;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItems, Long> {
    List<CartItems> findByCartCartId(Long cartId);
    void deleteByCartCartIdAndVehicleId(Long cartId, Long vehicleId);
    void deleteById(Long cartItemId);

}