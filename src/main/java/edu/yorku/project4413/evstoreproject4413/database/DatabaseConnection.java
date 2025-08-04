package edu.yorku.project4413.evstoreproject4413.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/evstore_db";
    private static final String USER = "root";
    private static final String PASSWORD = "password123";

    public static Connection connect() {
        try {
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connected to MySQL database!");
            return connection;
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
            return null;
        }
    }

    public static void main(String[] args) {
        connect(); // Test connection
    }
}
