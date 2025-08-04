package edu.yorku.project4413.evstoreproject4413.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import edu.yorku.project4413.evstoreproject4413.dto.SalesReportDTO;
import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.repository.OrderRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/reports")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AdminReportController {

    @Autowired
    private OrderRepository orderRepository;

    //  1. ADMIN updates order status
    @PutMapping("/orders/{orderId}/status")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok("Order status updated successfully.");
    }

    // 2. Get Sales Report (Completed Orders Only)
    @GetMapping(value = "/sales", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<SalesReportDTO>> getSalesReport() {
        List<Orders> sales = orderRepository.findByOrderStatus("Completed");

        if (sales.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Convert Orders to SalesReportDTO
        List<SalesReportDTO> salesReportDTOList = sales.stream()
            .map(order -> new SalesReportDTO(
                order.getOrderId(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getOrderItems().stream()
                    .filter(orderItem -> orderItem.getVehicle() != null)
                    .map(orderItem -> orderItem.getVehicle().getModel())
                    .collect(Collectors.toList())
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(salesReportDTOList);
    }
    
    // 3. Get Pending Orders
    @GetMapping(value = "/pending-orders", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<SalesReportDTO>> getPendingOrders() {
        List<Orders> pendingOrders = orderRepository.findByOrderStatus("Pending");

        if (pendingOrders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Convert Orders to SalesReportDTO
        List<SalesReportDTO> salesReportDTOList = pendingOrders.stream()
            .map(order -> new SalesReportDTO(
                order.getOrderId(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getOrderItems().stream()
                    .filter(orderItem -> orderItem.getVehicle() != null)
                    .map(orderItem -> orderItem.getVehicle().getModel())
                    .collect(Collectors.toList())
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(salesReportDTOList);
    }
}
