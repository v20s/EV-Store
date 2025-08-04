package edu.yorku.project4413.evstoreproject4413.service;

import edu.yorku.project4413.evstoreproject4413.model.ExtendedLoanRequest;
import edu.yorku.project4413.evstoreproject4413.model.ExtendedLoanResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

@Service
public class ExtendedLoanService {
    // Province tax rates
    private static final Map<String, Double> PROVINCE_TAX_RATES = Map.of(
        "ON", 0.13, "BC", 0.12, "AB", 0.05, "MB", 0.12, "QC", 0.14975, 
        "SK", 0.11, "NB", 0.15, "NS", 0.15, "PE", 0.15, "NL", 0.15
    );

    public ExtendedLoanResponse calculateExtended(ExtendedLoanRequest request) {
        // Validate province code
        if (!PROVINCE_TAX_RATES.containsKey(request.getProvince())) {
            throw new IllegalArgumentException("Invalid province code: " + request.getProvince());
        }
        if (request.getVehiclePrice() <= 0 || request.getTermMonths() <= 0) {
            throw new IllegalArgumentException("Vehicle price and term months must be greater than zero.");
        }

        // Convert to BigDecimal for precision
        BigDecimal vehiclePrice = BigDecimal.valueOf(request.getVehiclePrice());
        BigDecimal downPayment = BigDecimal.valueOf(request.getDownPayment());
        BigDecimal tradeValue = BigDecimal.valueOf(request.getTradeValue());
        BigDecimal interestRate = BigDecimal.valueOf(request.getInterest()).divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);
        BigDecimal taxRate = BigDecimal.valueOf(PROVINCE_TAX_RATES.get(request.getProvince()));

        // Calculate tax & total price
        BigDecimal taxedPrice = vehiclePrice.multiply(taxRate.add(BigDecimal.ONE)).setScale(2, RoundingMode.HALF_UP);

        // Amount to be financed (ensure it's non-negative)
        BigDecimal amountFinanced = taxedPrice.subtract(downPayment.add(tradeValue)).max(BigDecimal.ZERO);

        // Monthly interest rate
        BigDecimal monthlyRate = interestRate.divide(BigDecimal.valueOf(12), 10, RoundingMode.HALF_UP);
        int totalMonths = request.getTermMonths();

        BigDecimal monthlyPayment;

        if (monthlyRate.compareTo(BigDecimal.ZERO) == 0) {
            // If interest rate is 0, simple division
            monthlyPayment = amountFinanced.divide(BigDecimal.valueOf(totalMonths), 2, RoundingMode.HALF_UP);
        } else {
            // Using proper formula for loan payment calculation
            double powFactor = Math.pow(1 + monthlyRate.doubleValue(), totalMonths);
            BigDecimal denominator = BigDecimal.valueOf(powFactor).subtract(BigDecimal.ONE);

            monthlyPayment = amountFinanced.multiply(monthlyRate)
                    .multiply(BigDecimal.valueOf(powFactor))
                    .divide(denominator, 2, RoundingMode.HALF_UP);
        }

        // Calculate bi-weekly & weekly payments
        BigDecimal biWeeklyPayment = monthlyPayment.multiply(BigDecimal.valueOf(12)).divide(BigDecimal.valueOf(26), 2, RoundingMode.HALF_UP);
        BigDecimal weeklyPayment = monthlyPayment.multiply(BigDecimal.valueOf(12)).divide(BigDecimal.valueOf(52), 2, RoundingMode.HALF_UP);
        System.out.println("vehiclePrice: " + vehiclePrice);
        System.out.println("downPayment: " + downPayment);
        System.out.println("tradeValue: " + tradeValue);
        System.out.println("taxedPrice: " + taxedPrice);
        System.out.println("amountFinanced: " + amountFinanced);
        System.out.println("monthlyPayment: " + monthlyPayment);

        // Return response
        return new ExtendedLoanResponse(
        		
            monthlyPayment.doubleValue(),
            biWeeklyPayment.doubleValue(),
            weeklyPayment.doubleValue(),
            amountFinanced.doubleValue()
        );
    }
}
