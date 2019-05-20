package edu.csumb.sp19.cst438.mbari.api.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Site")
public class Site{
    String name;
    public Site(String name){
        this.name = name;
    }
    public void setSite(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }
}