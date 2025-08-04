package edu.yorku.project4413.evstoreproject4413.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityService {

    private Map<String, Integer> failedAttempts = new HashMap<>();

    
     //Tracks a failed login attempt for the given email.
     
     //@param email The user's email.
     
    public void trackFailedLoginAttempt(String email) {
        failedAttempts.put(email, failedAttempts.getOrDefault(email, 0) + 1);
    }

    
     //Checks if the account is locked due to too many failed attempts.
     
     //@param email The user's email.
     //@return True if the account is locked, false otherwise.
     
    public boolean isAccountLocked(String email) {
        return failedAttempts.getOrDefault(email, 0) >= 3;
    }

    
    //Clears failed login attempts for the given email.
     
   //@param email The user's email.
     
    public void clearFailedAttempts(String email) {
        failedAttempts.remove(email);
    }
}