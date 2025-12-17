package com.ecommerce.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = "com.ecommerce")
public class SbComApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbComApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
					.allowedOrigins("http://localhost:5173")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowCredentials(true);
				}
		};
	}

}
