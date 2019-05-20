package edu.csumb.sp19.cst438.mbari.api.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class User{
    String username;
    String password;
    String name;
    Auth auth = Auth.Tmp;
    List<Log> logs;
    @Id
    String userID;

    public User() {
    }

    public User(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.logs = new ArrayList<>();
    }
    public List<Log> getLogs(){
        return this.logs;
    }
    public void setLogs(){
        logs = new ArrayList<>();
    }
    public String getUsername() {
        return this.username;
    }
    public String getAuth(){
        return this.auth.getStatus();
    }
    public void setAuth(Auth auth){
        
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

   

    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}

