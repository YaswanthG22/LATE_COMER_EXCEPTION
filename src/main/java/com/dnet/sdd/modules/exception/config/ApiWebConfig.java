package com.dnet.sdd.modules.exception.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApiWebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // 🚫 Prevent Spring from treating /api/** as static resources
        registry
            .addResourceHandler("/api/**")
            .addResourceLocations("classpath:/not-a-static-path/");
    }
}
