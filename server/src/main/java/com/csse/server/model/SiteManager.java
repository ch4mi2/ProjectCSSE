package com.csse.server.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


@Document(collection = "siteManagers")
public class SiteManager {
    @Id
    private ObjectId id;

    private String name;
    private String empId;
    private String email;

    public SiteManager(String name, String empId, String email) {
        this.name = name;
        this.empId = empId;
        this.email = email;
        
    }

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
