package edu.yorku.project4413.evstoreproject4413.dto;

import edu.yorku.project4413.evstoreproject4413.model.User;

public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String region;
    private String role;

   
    public UserDTO() {}

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.region = user.getRegion();
        this.role = user.getRole();
    }

    // Add Getters (needed for JSON serialization)
    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getRegion() { return region; }
    public String getRole() { return role; }
}
