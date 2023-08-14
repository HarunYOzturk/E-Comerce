package com.example.mongodbproject.repository;

import com.example.mongodbproject.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ProductRepository extends MongoRepository<Product,String> {


    @Query("{name:'?0'}")
    Product findItemByName(String name);


    long count();
}
