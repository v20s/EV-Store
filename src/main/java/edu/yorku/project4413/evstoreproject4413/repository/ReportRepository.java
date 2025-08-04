package edu.yorku.project4413.evstoreproject4413.repository;

import edu.yorku.project4413.evstoreproject4413.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
