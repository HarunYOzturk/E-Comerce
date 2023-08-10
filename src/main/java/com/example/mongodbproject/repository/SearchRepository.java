package com.example.mongodbproject.repository;

import com.example.mongodbproject.model.Product;

import java.util.List;

public interface SearchRepository {

    List<Product> findByText(String text);
}
