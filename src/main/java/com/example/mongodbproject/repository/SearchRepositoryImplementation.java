package com.example.mongodbproject.repository;

import org.bson.Document;
import com.example.mongodbproject.model.Product;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepositoryImplementation implements SearchRepository {

    private final MongoClient mongoClient;
    private final MongoConverter mongoConverter;

    @Autowired
    public SearchRepositoryImplementation(MongoClient mongoClient, MongoConverter mongoConverter) {
        this.mongoClient = mongoClient;
        this.mongoConverter = mongoConverter;
    }

    @Override
    public List<Product> findByText(String text) {
        final List<Product> products = new ArrayList<>();
        MongoDatabase database = mongoClient.getDatabase("MyDatabase");
        MongoCollection<Document> collection = database.getCollection("product");

        // Build the aggregation pipeline
        List<Document> pipeline = Arrays.asList(
                new Document("$match", new Document("$or",
                        Arrays.asList(
                                new Document("name", new Document("$regex", text).append("$options", "i")),
                                new Document("description", new Document("$regex", text).append("$options", "i"))
                        )
                )),
                new Document("$sort", new Document("price", 1L))
//                ,
//                new Document("$limit", 3L)
        );

        AggregateIterable<Document> result = collection.aggregate(pipeline);

        result.forEach(document -> products.add(mongoConverter.read(Product.class, document)));
        result.forEach(document -> System.out.println(document.values()));

        return products;
    }
}
