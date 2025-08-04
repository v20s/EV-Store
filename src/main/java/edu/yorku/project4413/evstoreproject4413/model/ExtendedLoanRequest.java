package edu.yorku.project4413.evstoreproject4413.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExtendedLoanRequest {

    @JsonProperty("vehicle_price")
    private Double vehiclePrice;

    @JsonProperty("province")
    private String province; // e.g. "ON", "BC", "AB"

    @JsonProperty("term_months")
    private Integer termMonths;

    @JsonProperty("interest")
    private Double interest;

    @JsonProperty("down_payment")
    private Double downPayment;

    @JsonProperty("trade_value")
    private Double tradeValue;

    // Default Constructor (Required for Jackson)
    public ExtendedLoanRequest() {}

    // Parameterized Constructor
    public ExtendedLoanRequest(Double vehiclePrice, String province, Integer termMonths,
                               Double interest, Double downPayment, Double tradeValue) {
        this.vehiclePrice = vehiclePrice != null ? vehiclePrice : 1.0;
        this.province = province != null ? province.toUpperCase() : "ON";
        this.termMonths = termMonths != null ? termMonths : 36;
        this.interest = interest != null ? interest : 5.0;
        this.downPayment = downPayment != null ? downPayment : 0.0;
        this.tradeValue = tradeValue != null ? tradeValue : 0.0;
    }

    // Getters and Setters
    public Double getVehiclePrice() { return vehiclePrice; }
    public void setVehiclePrice(Double vehiclePrice) { this.vehiclePrice = vehiclePrice; }

    public String getProvince() { return province; }
    public void setProvince(String province) {
        this.province = (province != null) ? province.toUpperCase() : "ON";
    }

    public Integer getTermMonths() { return termMonths; }
    public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }

    public Double getInterest() { return interest; }
    public void setInterest(Double interest) { this.interest = interest; }

    public Double getDownPayment() { return downPayment; }
    public void setDownPayment(Double downPayment) { this.downPayment = downPayment; }

    public Double getTradeValue() { return tradeValue; }
    public void setTradeValue(Double tradeValue) { this.tradeValue = tradeValue; }

    @Override
    public String toString() {
        return "ExtendedLoanRequest{" +
                "vehiclePrice=" + vehiclePrice +
                ", province='" + province + '\'' +
                ", termMonths=" + termMonths +
                ", interest=" + interest +
                ", downPayment=" + downPayment +
                ", tradeValue=" + tradeValue +
                '}';
    }
}
