package edu.yorku.project4413.evstoreproject4413.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {

    private final Map<String, Long> blacklistedTokens = new ConcurrentHashMap<>();
    private static final long EXPIRATION_TIME = 3600; // 1 hour in seconds

    //  Blacklist a token with expiration
    public void blacklistToken(String token) {
        long expirationTimestamp = System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(EXPIRATION_TIME);
        blacklistedTokens.put(token, expirationTimestamp);
    }

    //  Check if a token is blacklisted
    public boolean isTokenBlacklisted(String token) {
        Long expirationTime = blacklistedTokens.get(token);
        if (expirationTime == null) {
            return false; // Token is not blacklisted
        }
        if (System.currentTimeMillis() > expirationTime) {
            blacklistedTokens.remove(token); // Remove expired token
            return false;
        }
        return true; // Token is still blacklisted
    }
}
