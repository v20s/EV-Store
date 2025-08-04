package edu.yorku.project4413.evstoreproject4413.repository;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import edu.yorku.project4413.evstoreproject4413.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByHotDealTrue();

    @Query("SELECT v FROM Vehicle v WHERE "
            + "(:type IS NULL OR :type = '' OR LOWER(TRIM(v.type)) = LOWER(TRIM(:type))) AND "
            + "(:model IS NULL OR :model = '' OR LOWER(TRIM(v.model)) = LOWER(TRIM(:model))) AND "
            + "(:trim IS NULL OR :trim = '' OR LOWER(TRIM(v.trim)) = LOWER(TRIM(:trim))) AND "
            + "(:paint IS NULL OR :paint = '' OR LOWER(TRIM(v.paint)) = LOWER(TRIM(:paint))) AND "
            + "(:wheels IS NULL OR :wheels = '' OR LOWER(TRIM(v.wheels)) = LOWER(TRIM(:wheels))) AND "
            + "(:interior IS NULL OR :interior = '' OR LOWER(TRIM(v.interior)) = LOWER(TRIM(:interior))) AND "
            + "(:seatLayout IS NULL OR :seatLayout = '' OR LOWER(TRIM(v.seatLayout)) = LOWER(TRIM(:seatLayout))) AND "
            + "(:performanceUpgrade IS NULL OR v.performanceUpgrade = :performanceUpgrade) AND "
            + "(:towHitch IS NULL OR v.towHitch = :towHitch) AND "
            + "(:price IS NULL OR v.price = :price) AND "
            + "(:year IS NULL OR :year = '' OR LOWER(TRIM(v.year)) = LOWER(TRIM(:year))) AND "
            + "(:mileage IS NULL OR v.mileage = :mileage) AND "
            + "(:hotDeal IS NULL OR v.hotDeal = :hotDeal) AND "
            + "(:exteriorColour IS NULL OR :exteriorColour = '' OR LOWER(TRIM(v.exteriorColour)) = LOWER(TRIM(:exteriorColour))) AND "
            + "(:tires IS NULL OR :tires = '' OR LOWER(TRIM(v.tires)) = LOWER(TRIM(:tires))) AND "
            + "(:range IS NULL OR :range = '' OR LOWER(TRIM(v.range)) = LOWER(TRIM(:range))) AND "
            + "(:topSpeed IS NULL OR :topSpeed = '' OR LOWER(TRIM(v.topSpeed)) = LOWER(TRIM(:topSpeed)))")
List<Vehicle> findByFilters(
        @Param("type") String type,
        @Param("model") String model,
        @Param("trim") String trim,
        @Param("paint") String paint,
        @Param("wheels") String wheels,
        @Param("interior") String interior,
        @Param("seatLayout") String seatLayout,
        @Param("performanceUpgrade") Boolean performanceUpgrade,
        @Param("towHitch") Boolean towHitch,
        @Param("price") BigDecimal price,
        @Param("year") String year,
        @Param("mileage") Integer mileage,
        @Param("hotDeal") Boolean hotDeal,
        @Param("exteriorColour") String exteriorColour,
        @Param("tires") String tires,
        @Param("range") String range,
        @Param("topSpeed") String topSpeed
);

}
