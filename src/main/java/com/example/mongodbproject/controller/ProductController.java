package com.example.mongodbproject.controller;


import com.example.mongodbproject.model.Product;
import com.example.mongodbproject.repository.ProductRepository;
import com.example.mongodbproject.repository.SearchRepository;
import com.example.mongodbproject.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SearchRepository searchRepository;

    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    private ProductService productService;

    @GetMapping("/products/getAllProducts")
    @CrossOrigin
    public List<Product> getAllProducts(){
       return productRepository.findAll();
    }

    @GetMapping("/products/getProductById/{productId}")
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

    @GetMapping("/products/search/{text}")
    public List<Product> search(@PathVariable String text){
        return searchRepository.findByText(text);
    }

    @GetMapping("/products/filterProductsByType/{selectedType}")
    public List<Product> filterProductsByType(@PathVariable String selectedType) {
        // Call a repository method to filter products by the selected type

        return productRepository.findByType(selectedType);
    }

    @GetMapping("/products/filterProductsByTypes/{selectedTypes}")
    public List<Product> filterProductsByTypes(@PathVariable List<String> selectedTypes) {
        if(selectedTypes.contains("All")){
            return productRepository.findAll();
        }
        return productRepository.findByTypeIn(selectedTypes);
    }

    @GetMapping("/products/filterProducts")
    public List<Product> filterProducts(
            @RequestParam(defaultValue = "") String term,
            @RequestParam List<String> types) {
        if (types.isEmpty() || types.contains("All")) {
            return productService.searchProductsByText(term);
        } else {
            return productService.searchProductsByTypeAndText(types, term);
        }
    }

}
