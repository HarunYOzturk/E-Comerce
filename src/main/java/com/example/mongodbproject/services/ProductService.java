package com.example.mongodbproject.services;

import com.example.mongodbproject.model.Product;
import com.example.mongodbproject.repository.ProductRepository;
import com.example.mongodbproject.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<Product> searchProductsByTypeAndText(List<String> types, String text) {
        if (types.isEmpty() || types.contains("All")) {
            return productRepository.findByTypeAndText("All", text);
        } else {
            List<Product> filteredProducts = new ArrayList<>();

            for (String type : types) {
                filteredProducts.addAll(productRepository.findByTypeAndText(type, text));
            }

            return filteredProducts;
        }
    }
}



