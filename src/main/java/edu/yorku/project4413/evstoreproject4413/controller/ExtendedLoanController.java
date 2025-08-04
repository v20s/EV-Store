package edu.yorku.project4413.evstoreproject4413.controller;

import edu.yorku.project4413.evstoreproject4413.model.ExtendedLoanRequest;
import edu.yorku.project4413.evstoreproject4413.model.ExtendedLoanResponse;
import edu.yorku.project4413.evstoreproject4413.service.ExtendedLoanService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loan")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class ExtendedLoanController {

    private static final Logger logger = LoggerFactory.getLogger(ExtendedLoanController.class);
    private final ExtendedLoanService service;

    public ExtendedLoanController(ExtendedLoanService service) {
        this.service = service;
    }

    @PostMapping("/provinceCalculate")
    public ResponseEntity<?> extendedCalculate(@Valid @RequestBody ExtendedLoanRequest request) {
        try {
        	System.out.println(" Incoming Payload:");
            System.out.println("vehiclePrice: " + request.getVehiclePrice());
            System.out.println("province: " + request.getProvince());
            System.out.println("termMonths: " + request.getTermMonths());
            System.out.println("interest: " + request.getInterest());
            System.out.println("downPayment: " + request.getDownPayment());
            System.out.println("tradeValue: " + request.getTradeValue());
            logger.info("Received Loan Calculation Request: {}", request);
            ExtendedLoanResponse response = service.calculateExtended(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error processing loan calculation: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Loan calculation failed. Please check inputs.");
        }
    }
}
