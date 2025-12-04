package com.example.latecomerexception.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Map HTTP requests like /uploads/** to your local folder (A:/DRDL DIT/uploads/)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:A:/DRDL DIT/uploads/");
    }
}
