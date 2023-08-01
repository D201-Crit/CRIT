package com.ssafy.crit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CritApplication {

	public static void main(String[] args) {
		SpringApplication.run(CritApplication.class, args);
	}

}
