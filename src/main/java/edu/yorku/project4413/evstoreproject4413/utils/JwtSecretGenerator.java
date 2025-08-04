package edu.yorku.project4413.evstoreproject4413.utils;

import io.jsonwebtoken.security.Keys;
import java.util.Base64;

public class JwtSecretGenerator {
    public static void main(String[] args) {
        byte[] keyBytes = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512).getEncoded();
        String base64Key = Base64.getEncoder().encodeToString(keyBytes);
        System.out.println("New JWT Secret Key: " + base64Key);
    }
}
