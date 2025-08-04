package edu.yorku.project4413.evstoreproject4413;

import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.jsonwebtoken.security.Keys;

@SpringBootApplication
@ComponentScan(basePackages = "edu.yorku.project4413.evstoreproject4413")
public class Evstoreproject4413Application {

    public static void main(String[] args) {
        SpringApplication.run(Evstoreproject4413Application.class, args);
    }

}