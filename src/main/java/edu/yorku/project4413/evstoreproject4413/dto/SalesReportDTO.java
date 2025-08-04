package edu.yorku.project4413.evstoreproject4413.dto;

import java.math.BigDecimal;
import java.util.List;

public class SalesReportDTO {
    private Long orderId;
    private String orderStatus;
    private BigDecimal totalAmount;
    private List<String> vehicleModels; // Ensure correct variable name

    // Constructor
    public SalesReportDTO(Long orderId, String orderStatus, BigDecimal totalAmount, List<String> vehicleModels) {
        this.orderId = orderId;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
        this.vehicleModels = vehicleModels;
    }

    // Getters
    public Long getOrderId() { return orderId; }
    public String getOrderStatus() { return orderStatus; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public List<String> getVehicleModels() { return vehicleModels; }
}
