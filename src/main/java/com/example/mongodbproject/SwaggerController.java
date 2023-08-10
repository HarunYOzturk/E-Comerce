package com.example.mongodbproject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SwaggerController {
    @GetMapping("/")
    // try using local tunnel with sending api documentation
    public String redirectToSwagger() {
        return "redirect:/swagger-ui.html";
    }
}
