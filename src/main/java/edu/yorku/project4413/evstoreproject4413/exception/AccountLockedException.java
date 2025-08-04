package edu.yorku.project4413.evstoreproject4413.exception;

public class AccountLockedException extends RuntimeException {
    public AccountLockedException(String message) {
        super(message);
    }
}