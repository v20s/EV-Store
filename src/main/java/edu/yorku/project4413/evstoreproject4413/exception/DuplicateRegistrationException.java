package edu.yorku.project4413.evstoreproject4413.exception;

public class DuplicateRegistrationException extends RuntimeException {
    public DuplicateRegistrationException(String message) {
        super(message);
    }
}