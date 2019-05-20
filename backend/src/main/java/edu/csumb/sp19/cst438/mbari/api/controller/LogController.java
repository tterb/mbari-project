package edu.csumb.sp19.cst438.mbari.api.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.csumb.sp19.cst438.mbari.api.model.Log;
import edu.csumb.sp19.cst438.mbari.api.model.User;
import edu.csumb.sp19.cst438.mbari.api.model.Site;
import edu.csumb.sp19.cst438.mbari.api.model.Diver;
import edu.csumb.sp19.cst438.mbari.api.repository.DiverRepository;
import edu.csumb.sp19.cst438.mbari.api.repository.SiteRepository;
import edu.csumb.sp19.cst438.mbari.api.repository.UserRepository;

@RestController
public class LogController{
    @Autowired 
    UserRepository userRepository;
    @Autowired
    DiverRepository diverRepository;
    @Autowired
    SiteRepository siteRepository;

    @GetMapping("/logs/getAll")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<Log> getAll() {
        List<Diver> divers = diverRepository.findAll();
        List<Log> logs = new ArrayList<>();
        for(Diver diver : divers) {
            logs.addAll(diver.getLogs());
        }
        return logs;
    }
    
    @GetMapping("/logs/")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<Log> getDiverLogs(String diver) {
        Optional<Diver> check = diverRepository.findByName(diver);
        if(check.isPresent()){
            return check.get().getLogs();
        } else {
            return null;
        }
    }

    @PostMapping("/logs/add")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public Diver addLog(String diverName, String siteName, String timeIn, String timeOut) {
        Diver diver = diverRepository.findByName(diverName).get();
        Site site = siteRepository.findByName(siteName).get();
        String uuid = UUID.randomUUID().toString();
        Log log = new Log(uuid, diverName, site, timeIn, timeOut);
        diver.addLog(log);
        diver = diverRepository.save(diver);
        return diver;
    }
    
    @PostMapping("/logs/delete")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public boolean deleteLog(String diver, String id) {
        Optional<Diver> check = diverRepository.findByName(diver);
        if(check.isPresent()) {
            Diver logDiver = check.get();
            for(Log log : logDiver.getLogs()) {
                if(log.getId().equals(id)) {
                    logDiver.deleteLog(log);
                    diverRepository.save(logDiver);
                    return true;
                }
            }
        }
        return false;
    }

    @PostMapping("/sites/add")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public boolean addSite(String name) {
        Optional<Site> check = siteRepository.findByName(name);
        if(!check.isPresent()) {
            Site site = new Site(name);
            site = siteRepository.save(site);
            return true;
        }
        return false;
    }

    @GetMapping("/sites/all")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<String> getSites() {
        List<String> sites = new ArrayList<>();
        for(Site s : siteRepository.findAll()) {
            sites.add(s.getName());
        }
        return sites;
    }
    
    
}