package edu.yorku.project4413.evstoreproject4413.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import edu.yorku.project4413.evstoreproject4413.model.Vehicle;
import edu.yorku.project4413.evstoreproject4413.repository.VehicleRepository;
import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/vehicles")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AdminVehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Add a new vehicle
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> addVehicle(@Valid @RequestBody Vehicle vehicle) {
        vehicleRepository.save(vehicle);
        return ResponseEntity.ok("Vehicle added successfully.");
    }

    // Delete a vehicle (Only if it exists)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);

        if (vehicle.isPresent()) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.ok("Vehicle deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
