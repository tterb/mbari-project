package edu.csumb.sp19.cst438.mbari.api.model;
import java.io.Serializable;

public enum Auth implements Serializable{
    Diver,Admin,Trainer,Tech,Tmp;
    
    public String getStatus() {
        return this.name();
    }
}