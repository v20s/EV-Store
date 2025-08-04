package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.model.Vehicle;
import edu.yorku.project4413.evstoreproject4413.repository.VehicleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Create a new vehicle (Admin Only)
    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@Valid @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleRepository.save(vehicle));
    }

    // Get all vehicles with filters (Sorting applied AFTER fetching)
    @GetMapping
    public ResponseEntity<List<Vehicle>> getVehicles(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String trim,
            @RequestParam(required = false) String paint,
            @RequestParam(required = false) String wheels,
            @RequestParam(required = false) String interior,
            @RequestParam(required = false) String seatLayout,
            @RequestParam(required = false) Boolean performanceUpgrade,
            @RequestParam(required = false) Boolean towHitch,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) Integer mileage,
            @RequestParam(required = false) Boolean hotDeal,
            @RequestParam(required = false) String exteriorColour,
            @RequestParam(required = false) String tires,
            @RequestParam(required = false) String range,
            @RequestParam(required = false) String topSpeed,
            @RequestParam(required = false, defaultValue = "none") String sort) {

        // Fetch filtered vehicles (Without sorting)
        List<Vehicle> vehicles = vehicleRepository.findByFilters(
                type, model, trim, paint, wheels, interior, seatLayout,
                performanceUpgrade, towHitch, price, year, mileage, hotDeal,
                exteriorColour, tires, range, topSpeed
        );

        // Apply sorting manually
        vehicles = applySorting(vehicles, sort);

        return ResponseEntity.ok(vehicles);
    }

    // Sorting logic applied after fetching vehicles
    private List<Vehicle> applySorting(List<Vehicle> vehicles, String sort) {
        return switch (sort.toLowerCase()) {
            case "price_asc" -> vehicles.stream()
                    .sorted(Comparator.comparing(Vehicle::getPrice))
                    .collect(Collectors.toList());
            case "price_desc" -> vehicles.stream()
                    .sorted(Comparator.comparing(Vehicle::getPrice).reversed())
                    .collect(Collectors.toList());
            case "mileage_asc" -> vehicles.stream()
                    .sorted(Comparator.comparing(Vehicle::getMileage))
                    .collect(Collectors.toList());
            case "mileage_desc" -> vehicles.stream()
                    .sorted(Comparator.comparing(Vehicle::getMileage).reversed())
                    .collect(Collectors.toList());
            default -> vehicles; // No sorting applied
        };
    }

    // Get a specific vehicle by ID
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/hot-deals")
    public ResponseEntity<List<Vehicle>> getHotDeals() {
        return ResponseEntity.ok(vehicleRepository.findByHotDealTrue());
    }

    @GetMapping("/{id}/zoomed-view")
    public ResponseEntity<Map<String, String>> getZoomedInView(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    String zoomedImageUrl = vehicle.getCoverImage().replace("low-res", "high-res");
                    return ResponseEntity.ok(Map.of("zoomedView", zoomedImageUrl));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Compare multiple vehicles
    @PostMapping("/compare")
    public ResponseEntity<?> compareVehicles(@RequestBody CompareRequest request) {
        List<Vehicle> vehicles = vehicleRepository.findAllById(request.getVehicleIds());
        return vehicles.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(new CompareResponse(vehicles));
    }

    // Update a vehicle (Admin Only)
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @Valid @RequestBody Vehicle updatedVehicle) {
        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    vehicle.setType(updatedVehicle.getType());
                    vehicle.setModel(updatedVehicle.getModel());
                    vehicle.setTrim(updatedVehicle.getTrim());
                    vehicle.setPaint(updatedVehicle.getPaint());
                    vehicle.setWheels(updatedVehicle.getWheels());
                    vehicle.setInterior(updatedVehicle.getInterior());
                    vehicle.setSeatLayout(updatedVehicle.getSeatLayout());
                    vehicle.setPerformanceUpgrade(updatedVehicle.isPerformanceUpgrade());
                    vehicle.setTowHitch(updatedVehicle.isTowHitch());
                    vehicle.setPrice(updatedVehicle.getPrice());
                    vehicle.setYear(updatedVehicle.getYear());
                    vehicle.setMileage(updatedVehicle.getMileage());
                    vehicle.setHotDeal(updatedVehicle.isHotDeal());
                    vehicle.setExteriorColour(updatedVehicle.getExteriorColour());
                    vehicle.setTires(updatedVehicle.getTires());
                    vehicle.setRange(updatedVehicle.getRange());
                    vehicle.setTopSpeed(updatedVehicle.getTopSpeed());
                    return ResponseEntity.ok(vehicleRepository.save(vehicle));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/customize")
    public ResponseEntity<Vehicle> customizeVehicle(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates) {

        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    // Apply custom updates
                    if (updates.containsKey("exteriorColour")) {
                        vehicle.setExteriorColour(updates.get("exteriorColour"));
                    }
                    if (updates.containsKey("tires")) {
                        vehicle.setTires(updates.get("tires"));
                    }

                    return ResponseEntity.ok(vehicleRepository.save(vehicle));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Delete a vehicle (Admin Only)
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    public static class CompareRequest {
        private List<Long> vehicleIds;
        public List<Long> getVehicleIds() { return vehicleIds; }
        public void setVehicleIds(List<Long> vehicleIds) { this.vehicleIds = vehicleIds; }
    }

    public static class CompareResponse {
        private List<VehicleSummary> vehicles;
        public CompareResponse(List<Vehicle> vehicles) {
            this.vehicles = vehicles.stream()
                    .map(v -> new VehicleSummary(v.getVehicleId(), v.getModel(), v.getPrice()))
                    .toList();
        }
        public List<VehicleSummary> getVehicles() { return vehicles; }
    }

    public static class VehicleSummary {
        private Long id;
        private String model;
        private BigDecimal price;
        public VehicleSummary(Long id, String model, BigDecimal price) {
            this.id = id;
            this.model = model;
            this.price = price;
        }
        public Long getId() { return id; }
        public String getModel() { return model; }
        public BigDecimal getPrice() { return price; }
    }
}
