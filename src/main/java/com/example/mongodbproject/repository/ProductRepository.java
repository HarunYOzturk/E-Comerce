package com.example.mongodbproject.repository;

import com.example.mongodbproject.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product,String> {


    @Query("{name:'?0'}")
    Product findItemByName(String name);

    @Query("{'type': ?0}")
    List<Product> findByType(String type);


    List<Product> findByTypeIn(List<String> types);
    long count();

    @Query("{ $and: [ { 'type': ?0 }, { $or: [ { 'name': { $regex: ?1, $options: 'i' } }, { 'description': { $regex: ?1, $options: 'i' } } ] } ] }")
    List<Product> findByTypeAndText(String type, String text);
}
