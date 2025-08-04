package edu.yorku.project4413.evstoreproject4413.config;

import edu.yorku.project4413.evstoreproject4413.security.JwtTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.List;

@Configuration
public class SecurityConfig { 

    
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("*"));
                corsConfig.setAllowCredentials(true);
                return corsConfig;
            }))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/", "/api/login", "/api/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/vehicles/**").permitAll()

                // USER Routes
                .requestMatchers(HttpMethod.GET, "/api/users/id").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/reviews/add").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.GET, "/api/orders/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/orders/checkout").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.GET, "/api/cart/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/cart/add").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.DELETE, "/api/cart/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/loan/provinceCalculate").authenticated()



                //ADMIN Routes (must match database role "ROLE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/admin/**").hasAuthority("ROLE_ADMIN")

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
