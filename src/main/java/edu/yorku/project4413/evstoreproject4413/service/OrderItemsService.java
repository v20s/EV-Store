package edu.yorku.project4413.evstoreproject4413.service;

import edu.yorku.project4413.evstoreproject4413.exception.ResourceNotFoundException;
import edu.yorku.project4413.evstoreproject4413.model.OrderItems;
import edu.yorku.project4413.evstoreproject4413.model.Vehicle;
import edu.yorku.project4413.evstoreproject4413.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemsService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public void setVehicleIdForOrderItem(OrderItems orderItem, Long vehicleId) {
        if (vehicleId == null) {
            throw new IllegalArgumentException("Vehicle ID cannot be null.");
        }

        // Fetch the Vehicle entity from the database using vehicleId
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + vehicleId));
        
        orderItem.setVehicle(vehicle);
    }
}
