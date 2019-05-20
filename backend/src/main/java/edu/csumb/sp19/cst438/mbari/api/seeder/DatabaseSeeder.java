package edu.csumb.sp19.cst438.mbari.api.seeder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.csumb.sp19.cst438.mbari.api.model.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import edu.csumb.sp19.cst438.mbari.api.model.Diver;
import edu.csumb.sp19.cst438.mbari.api.model.Site;
import edu.csumb.sp19.cst438.mbari.api.model.User;
import edu.csumb.sp19.cst438.mbari.api.repository.DiverRepository;
import edu.csumb.sp19.cst438.mbari.api.repository.SiteRepository;
import edu.csumb.sp19.cst438.mbari.api.repository.UserRepository;

@Component
public class DatabaseSeeder {
    
    private UserRepository userRepository;
    private DiverRepository diverRepository;
    private SiteRepository siteRepository;
    
    @Autowired
    public DatabaseSeeder(
        UserRepository userRepository,
        DiverRepository diverRepository,
        SiteRepository siteRepository) {
        this.userRepository = userRepository;
        this.diverRepository = diverRepository;
        this.siteRepository = siteRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedUsers();
        seedDivers();
        seedSites();
        seedDiveLogs();
    }
    
    private void seedUsers() {
        Optional<User> check = userRepository.findByUsername("admin");
        if(!check.isPresent()) {
            User user = new User("admin", "password", "John Doe");
            user = userRepository.save(user);
        }
    }
    
    private void seedDivers() {
        Optional<Diver> check = diverRepository.findByName("Diver1");
        if(!check.isPresent()) {
            diverRepository.save(new Diver("Diver1"));
            diverRepository.save(new Diver("Diver2"));
            diverRepository.save(new Diver("Diver3"));
            diverRepository.save(new Diver("Diver4"));
        }
    }
    
    private void seedSites() {
        Optional<Site> check = siteRepository.findByName("Monterey Bay");
        if(!check.isPresent()) {
            siteRepository.save(new Site("Monterey Bay"));
            siteRepository.save(new Site("Bermuda Triangle"));
            siteRepository.save(new Site("Cancun"));
            siteRepository.save(new Site("YMCA"));
        }
    }

    private void seedDiveLogs() {
        List<Diver> divers = diverRepository.findAll();
        List<Log> check = check = divers.get(0).getLogs();
    
        if (check.isEmpty()) {
            Diver d1 = diverRepository.findByName("Diver1").get();
            Diver d2 = diverRepository.findByName("Diver2").get();
    
            List<String> sites = new ArrayList<>();
            for(Site s : siteRepository.findAll()) {
                sites.add(s.getName());
                d1.addLog(new Log(d1.getName(), s, "Wed May 08 2019 23:23:37 GMT-0700", "Wed May 08 2019 25:27:37 GMT-0700"));
                d2.addLog(new Log(d2.getName(), s, "Wed May 18 2019 07:23:37 GMT-0700", "Wed May 18 2019 09:13:37 GMT-0700"));
                diverRepository.save(d1);
                diverRepository.save(d2);
            }
        }
    }
}