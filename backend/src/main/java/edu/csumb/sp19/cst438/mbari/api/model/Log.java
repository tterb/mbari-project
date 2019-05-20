package edu.csumb.sp19.cst438.mbari.api.model;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Log")
public class Log {
    String id;
    String diver;
    Site site;
    Date timeIn;
    Date timeOut;


    public Log() {
    }
    
    public Log(String diver, Site site, String timeIn, String timeOut) {
        this(UUID.randomUUID().toString(), diver, site, timeIn, timeOut);
    }

    public Log(String id, String diver, Site site, String timeIn, String timeOut) {
        this.id = id;
        this.diver = diver;
        this.site = site;
        this.timeIn = convertToDate(timeIn);
        this.timeOut = convertToDate(timeOut);
    }
    
    public Date convertToDate(String time) {
        try {
            SimpleDateFormat jsfmt = new SimpleDateFormat("EE MMM d y H:m:s 'GMT'Z (zz)");
            return jsfmt.parse(time);
        } catch (ParseException e) {
            return new Date();  // probably needs to be handled a different way
        }
    }
    
    public Site getSite() {
        return this.site;
    }

    public void setSite(Site site) {
        this.site = site;
    }
    
    public String getDiver() {
        return this.diver;
    }

    public void setDiver(String newDiver) {
        this.diver = newDiver;
    }

    public Date getTimeIn() {
        return this.timeIn;
    }

    public void setTimeIn(Date timeIn) {
        this.timeIn = timeIn;
    }

    public Date getTimeOut() {
        return this.timeOut;
    }

    public void setTimeOut(Date timeOut) {
        this.timeOut = timeOut;
    }

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    @Override
    public String toString() {
        return String.format("Log: id='%s', Site='%s']", this.id, this.site.getName());
    }

}