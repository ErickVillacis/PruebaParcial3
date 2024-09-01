package com.conjunta.vimecu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/graphql/**") // Asegúrate de que la ruta coincida con tu API GraphQL
                        .allowedOrigins("http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Permitir todas las cabeceras
                        .allowCredentials(true); // Permitir envío de credenciales

                registry.addMapping("/api/**") // Asegúrate de que la ruta coincida con tu API REST
                        .allowedOrigins("http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Permitir todas las cabeceras
                        .allowCredentials(true); // Permitir envío de credenciales
            }
        };
    }
}
