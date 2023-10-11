package com.csse.server.model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "siteManagers")
public class SiteManager {
    private String name;
    private String empId;
    private String email;

    public SiteManager() {}

    //setters
    public void setName(String name) {
        this.name = name;
    }
    
    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //getters
    public String getName() {
        return name;
    }
    
    public String getEmpId() {
        return empId;
    }

    public String getEmail() {
        return email;
    }

    
}
