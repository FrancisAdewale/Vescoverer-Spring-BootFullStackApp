package com.spring.fullstack.vescoverer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication
public class VescovererApplication {

	public static void main(String[] args) {
		SpringApplication.run(VescovererApplication.class, args);
	}

}
