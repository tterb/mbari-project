package edu.csumb.sp19.cst438.mbari.api.repository;

import edu.csumb.sp19.cst438.mbari.api.model.Site;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

/**
 *
 */
public interface SiteRepository extends MongoRepository<Site,String>{
    Optional<Site> findByName(String name);
}
   