package edu.yorku.project4413.evstoreproject4413.dto;

import java.util.List;

public class CheckoutRequest {
    private double finalTotal;
    private double taxAmount;
    private double shippingCost;
    private List<CartItemDTO> items;

    public double getFinalTotal() {
        return finalTotal;
    }

    public void setFinalTotal(double finalTotal) {
        this.finalTotal = finalTotal;
    }

    public double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}
