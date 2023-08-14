package com.example.mongodbproject.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

enum Type{
    Electronic,
    Gardening,
    Furniture,
    Fashion,
    Home,
    Books,
    Health,
    Toys,
    Groceries,
    Jewelry,
    Automotive
}
enum Currency{
    $,
    €,
    ₺,
    £
}
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document("product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String name;
    private String description;
    private Type type;
    private int price;
    private Currency currency;



}
