package edu.yorku.project4413.evstoreproject4413.repository;
import  edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.User;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUser_UserId(Long userId);
    
    List<Orders> findByUser(User userId);
    
    @EntityGraph(attributePaths = {"orderItems.vehicle"}) // Fetch orderItems and their associated vehicles
    List<Orders> findByOrderStatus(String orderStatus);
}