package edu.csumb.sp19.cst438.mbari.api.controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.csumb.sp19.cst438.mbari.api.model.Diver;
import edu.csumb.sp19.cst438.mbari.api.model.User;
import edu.csumb.sp19.cst438.mbari.api.repository.DiverRepository;
import edu.csumb.sp19.cst438.mbari.api.repository.UserRepository;

@RestController
public class UserController{
    @Autowired
    UserRepository userRepository;
    @Autowired
    DiverRepository diverRepository;
    
    @PostMapping("/user/register")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public User addUser(String username,String password,String name){
        User user = new User(username, password,name);
        if(userRepository.findByUsername(username).isPresent()){
            return null;
        }
        userRepository.save(user);
        return user;
    }

    @PostMapping("/user/login")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public User login(String username,String password){
        Optional<User> temp = userRepository.findByUsername(username);
        if(temp.isPresent()){
            if(password.equals(temp.get().getPassword())){
                return temp.get();
            }
        }
        return null;
    }

    @PostMapping("/user/addDiver")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public boolean addDiver(String name){
        Optional<Diver> check = diverRepository.findByName(name);
        if(!check.isPresent()) {
            diverRepository.save(new Diver(name));
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/user/allDivers")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<String> getAll(){
        List<Diver> divers = diverRepository.findAll(); 
        List<String> diverNames = new ArrayList<>();
        for(Diver d : divers) {
            diverNames.add(d.getName());
        }
        return diverNames;
    }


    // @PostMapping("/user/pwChange")
    // @ResponseBody
    // public Boolean changePassword(String username,String oldPassword,String newPassword){
    //     User temp = login(username,oldPassword);
    //     if(temp != null){
    //         User newPass = new User(temp.getUsername(),newPassword);
    //         userRepository.save(newPass);
    //        return true;
    //     }
    //     return false;
    // }
    // @PostMapping("/user/delete")
    // @ResponseBody
    // public Boolean deleteUser(String username,String password){
    //     User user = login(username, password);
    //     if(user == null){
    //         return false;
    //     }
    //     userRepository.delete(user);
    //     return true;
    // }
    
}