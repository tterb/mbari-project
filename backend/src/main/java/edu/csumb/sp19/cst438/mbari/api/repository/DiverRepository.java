package edu.csumb.sp19.cst438.mbari.api.repository;

import edu.csumb.sp19.cst438.mbari.api.model.Diver;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;
import java.util.List;

/**
 *
 */
public interface DiverRepository extends MongoRepository<Diver,String>{
    @Query(value = "{'id':?0}")
    Optional<Diver> findByRepoId(String id);
    Optional<Diver> findByName(String name);
    void delete(Diver diver);
}
   
 
