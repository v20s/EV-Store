package edu.yorku.project4413.evstoreproject4413.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExtendedLoanResponse {

    @JsonProperty("monthly_payment")
    private Double monthlyPayment = 0.0;

    @JsonProperty("bi_weekly_payment")
    private Double biWeeklyPayment = 0.0;

    @JsonProperty("weekly_payment")
    private Double weeklyPayment = 0.0;

    @JsonProperty("amount_financed")
    private Double amountFinanced = 0.0;

    // Default Constructor
    public ExtendedLoanResponse() {}

    // Parameterized Constructor
    public ExtendedLoanResponse(Double monthlyPayment, Double biWeeklyPayment,
                                Double weeklyPayment, Double amountFinanced) {
        this.monthlyPayment = monthlyPayment != null ? monthlyPayment : 0.0;
        this.biWeeklyPayment = biWeeklyPayment != null ? biWeeklyPayment : 0.0;
        this.weeklyPayment = weeklyPayment != null ? weeklyPayment : 0.0;
        this.amountFinanced = amountFinanced != null ? amountFinanced : 0.0;
    }

    // Getters and Setters
    public Double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(Double monthlyPayment) {
        this.monthlyPayment = monthlyPayment != null ? monthlyPayment : 0.0;
    }

    public Double getBiWeeklyPayment() { return biWeeklyPayment; }
    public void setBiWeeklyPayment(Double biWeeklyPayment) {
        this.biWeeklyPayment = biWeeklyPayment != null ? biWeeklyPayment : 0.0;
    }

    public Double getWeeklyPayment() { return weeklyPayment; }
    public void setWeeklyPayment(Double weeklyPayment) {
        this.weeklyPayment = weeklyPayment != null ? weeklyPayment : 0.0;
    }

    public Double getAmountFinanced() { return amountFinanced; }
    public void setAmountFinanced(Double amountFinanced) {
        this.amountFinanced = amountFinanced != null ? amountFinanced : 0.0;
    }

    // Override toString() for debugging/logging
    @Override
    public String toString() {
        return "ExtendedLoanResponse{" +
                "monthlyPayment=" + monthlyPayment +
                ", biWeeklyPayment=" + biWeeklyPayment +
                ", weeklyPayment=" + weeklyPayment +
                ", amountFinanced=" + amountFinanced +
                '}';
    }
}
