package edu.yorku.project4413.evstoreproject4413.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity //
@Table(name = "reports") // 
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private String reportType;

    @Column(columnDefinition = "TEXT")
    private String reportData;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Default Constructor
    public Report() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructor
    public Report(String reportType, String reportData) {
        this.reportType = reportType;
        this.reportData = reportData;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getReportId() { return reportId; }
    public void setReportId(Long reportId) { this.reportId = reportId; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getReportData() { return reportData; }
    public void setReportData(String reportData) { this.reportData = reportData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
