package edu.yorku.project4413.evstoreproject4413.repository;

import edu.yorku.project4413.evstoreproject4413.model.OrderItems;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItems, Long> {
    List<OrderItems> findByOrderOrderId(Long orderId);
}