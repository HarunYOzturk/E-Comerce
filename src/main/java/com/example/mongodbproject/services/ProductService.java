package com.example.mongodbproject.services;

import com.example.mongodbproject.model.Product;
import com.example.mongodbproject.repository.ProductRepository;
import com.example.mongodbproject.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    SearchRepository searchRepository;

    @Autowired
    ProductRepository productRepository;
    public List<Product> searchProductsByText(String text) {
        return searchRepository.findByText(text);
    }
    public List<Product> searchProductsByTypeAndText(String type, String text) {
        return productRepository.findByTypeAndText(type, text);
    }



}

