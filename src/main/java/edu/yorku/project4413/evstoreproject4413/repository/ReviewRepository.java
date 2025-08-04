package edu.yorku.project4413.evstoreproject4413.repository;

import edu.yorku.project4413.evstoreproject4413.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Fetch reviews by vehicle ID
    List<Review> findByVehicle_VehicleId(Long vehicleId);

    // Fetch reviews by user ID
    List<Review> findByUser_UserId(Long userId);
}
