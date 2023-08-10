package com.example.mongodbproject.controller;


import com.example.mongodbproject.model.Product;
import com.example.mongodbproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> getAllProducts(){
       return productRepository.findAll();
    }

    @GetMapping("/products/{productId}")
    public Optional<Product> getProductById(@PathVariable String productId) {
        return productRepository.findById(productId);

    }

    @GetMapping("/products/getByName/{productName}")
    public Product getProductByName(@PathVariable String productName){
        return productRepository.findItemByName(productName);
    }
    @PostMapping("/products/addProduct")
    public Product addProduct(@RequestBody Product product){
        product.setId(null);
        return productRepository.save(product);
    }
    @PutMapping("/products/updateProduct")
    public ResponseEntity<Product> updateProduct( @RequestBody Product updatedProduct) {

        Optional<Product> optionalProduct = productRepository.findById(updatedProduct.getId());

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            // Update fields of the existing product with the new data
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setType(updatedProduct.getType());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCurrency(updatedProduct.getCurrency());

            // Save the updated product
            Product savedProduct = productRepository.save(existingProduct);

            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/products/deleteProduct/{productId}")
    public ResponseEntity<Product> deleteProduct(@PathVariable String productId){
        Optional<Product> toBeDeletedProductData = productRepository.findById(productId);
        if(toBeDeletedProductData.isPresent()){
            productRepository.deleteById(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }



}
