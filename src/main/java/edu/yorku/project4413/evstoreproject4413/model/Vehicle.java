package edu.yorku.project4413.evstoreproject4413.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id")
    private Long vehicleId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "payment", nullable = false)
    private String payment;  // Values: "Cash", "Finance", "Both"

    @Column(name = "trim")
    private String trim;

    @Column(name = "paint")
    private String paint;

    @Column(name = "wheels")
    private String wheels;

    @Column(name = "interior")
    private String interior;

    @Column(name = "seat_layout")
    @JsonProperty("seat_layout")
    private String seatLayout;

    @Column(name = "performance_upgrade")
    private boolean performanceUpgrade;

    @Column(name = "tow_hitch")
    private boolean towHitch;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "year", nullable = false)
    private String year;

    @Column(name = "mileage")
    private Integer mileage;

    @Column(name = "cover_image")
    @JsonProperty("cover_image")
    private String coverImage;

    @Column(name = "hot_deal")
    private boolean hotDeal;

    @Column(name = "exterior_colour")
    private String exteriorColour;

    @Column(name = "tires")
    private String tires;

    @Column(name = "`range`")
    private String range;

    @Column(name = "top_speed")
    private String topSpeed;
    
    @Column(name = "kmh")
    private String kmh;


    // Relationship with OrderItems
    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrderItems> orderItems;

    // Relationship with Reviews
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews;

    // Constructors
    public Vehicle() {}

    public Vehicle(Long vehicleId, String type, String model, String payment, String trim, String paint,
                   String wheels, String interior, String seatLayout, boolean performanceUpgrade, boolean towHitch,
                   BigDecimal price, String year, Integer mileage, String coverImage, boolean hotDeal,
                   String exteriorColour, String tires, String range, String topSpeed) {
        this.vehicleId = vehicleId;
        this.type = type;
        this.model = model;
        this.payment = payment;
        this.trim = trim;
        this.paint = paint;
        this.wheels = wheels;
        this.interior = interior;
        this.seatLayout = seatLayout;
        this.performanceUpgrade = performanceUpgrade;
        this.towHitch = towHitch;
        this.price = price;
        this.year = year;
        this.mileage = mileage;
        this.coverImage = coverImage;
        this.hotDeal = hotDeal;
        this.exteriorColour = exteriorColour;
        this.tires = tires;
        this.range = range;
        this.topSpeed = topSpeed;
    }

    // Getters and Setters
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getPayment() { return payment; }
    public void setPayment(String payment) { this.payment = payment; }

    public String getTrim() { return trim; }
    public void setTrim(String trim) { this.trim = trim; }

    public String getPaint() { return paint; }
    public void setPaint(String paint) { this.paint = paint; }

    public String getWheels() { return wheels; }
    public void setWheels(String wheels) { this.wheels = wheels; }

    public String getInterior() { return interior; }
    public void setInterior(String interior) { this.interior = interior; }

    public String getSeatLayout() { return seatLayout; }
    public void setSeatLayout(String seatLayout) { this.seatLayout = seatLayout; }

    public boolean isPerformanceUpgrade() { return performanceUpgrade; }
    public void setPerformanceUpgrade(boolean performanceUpgrade) { this.performanceUpgrade = performanceUpgrade; }

    public boolean isTowHitch() { return towHitch; }
    public void setTowHitch(boolean towHitch) { this.towHitch = towHitch; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public Integer getMileage() { return mileage; }
    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public boolean isHotDeal() { return hotDeal; }
    public void setHotDeal(boolean hotDeal) { this.hotDeal = hotDeal; }

    public String getExteriorColour() { return exteriorColour; }
    public void setExteriorColour(String exteriorColour) { this.exteriorColour = exteriorColour; }

    public String getTires() { return tires; }
    public void setTires(String tires) { this.tires = tires; }

    public String getRange() { return range; }
    public void setRange(String range) { this.range = range; }

    public String getTopSpeed() { return topSpeed; }
    public void setTopSpeed(String topSpeed) { this.topSpeed = topSpeed; }
    
    public String getKmh() {
        return kmh;
    }

    public void setKmh(String kmh) {
        this.kmh = kmh;
    }


    public List<OrderItems> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItems> orderItems) { this.orderItems = orderItems; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    @Override
    public String toString() {
        return "Vehicle{" +
                "vehicleId=" + vehicleId +
                ", type='" + type + '\'' +
                ", model='" + model + '\'' +
                ", payment='" + payment + '\'' +
                ", trim='" + trim + '\'' +
                ", paint='" + paint + '\'' +
                ", wheels='" + wheels + '\'' +
                ", interior='" + interior + '\'' +
                ", seatLayout='" + seatLayout + '\'' +
                ", performanceUpgrade=" + performanceUpgrade +
                ", towHitch=" + towHitch +
                ", price=" + price +
                ", year='" + year + '\'' +
                ", mileage=" + mileage +
                ", coverImage='" + coverImage + '\'' +
                ", hotDeal=" + hotDeal +
                ", exteriorColour='" + exteriorColour + '\'' +
                ", tires='" + tires + '\'' +
                ", range='" + range + '\'' +
                ", topSpeed='" + topSpeed + '\'' +
                '}';
    }
}
