package edu.csumb.sp19.cst438.mbari.api.repository;

import edu.csumb.sp19.cst438.mbari.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 *
 */
public interface UserRepository extends MongoRepository<User,String>{
    Optional<User> findByUsername(String username);
    void delete(User user);
}
   
 
