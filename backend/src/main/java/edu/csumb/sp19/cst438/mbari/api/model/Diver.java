package edu.csumb.sp19.cst438.mbari.api.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("diver")
public class Diver{
    @Id
    String id;
    String name;
    List<Log> logs;

    public Diver() { }

    public Diver(String name) {
        this.name = name;
        this.logs = new ArrayList<Log>();
    }
    
    public List<Log> getLogs(){
        return this.logs;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public void addLog(Log log) {
        this.logs.add(log);
    }
    
    public void deleteLog(Log log) {
        this.logs.remove(log);
    }

    public String getId() {
        return this.id;
    }
    
    @Override
    public String toString() {
        return String.format("Diver: ID='%s', Name='%s', Logs='%d']", this.id, this.name, this.logs.size());
    }

}