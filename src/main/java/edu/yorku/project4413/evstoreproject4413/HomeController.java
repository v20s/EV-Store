package edu.yorku.project4413.evstoreproject4413;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the EV Store Project!";
    }
    
    
}