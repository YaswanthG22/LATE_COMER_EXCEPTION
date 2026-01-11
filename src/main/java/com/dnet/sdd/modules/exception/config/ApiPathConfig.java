package com.dnet.sdd.modules.exception.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApiPathConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // 🚫 DO NOT treat /api/** as static resources
        registry
            .addResourceHandler("/api/**")
            .addResourceLocations("classpath:/_api_should_not_be_static_/");
    }
}
