package edu.yorku.project4413.evstoreproject4413.service;

import edu.yorku.project4413.evstoreproject4413.dto.SalesReportDTO;
import edu.yorku.project4413.evstoreproject4413.model.Orders;
import edu.yorku.project4413.evstoreproject4413.model.Report;
import edu.yorku.project4413.evstoreproject4413.repository.OrderRepository;
import edu.yorku.project4413.evstoreproject4413.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Transactional(readOnly = true)
    public List<SalesReportDTO> getSalesReport() {
        List<Orders> sales = orderRepository.findByOrderStatus("Completed");

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

        // Store the report in the database
        Report report = new Report("Sales", salesReportDTOList.toString());
        reportRepository.save(report);

        return salesReportDTOList;
    }
}
