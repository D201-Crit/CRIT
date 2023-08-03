package com.ssafy.crit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CritApplication {

	/**
	 * 해당 설정을 하지 않을 경우 AWS S3서비스가 실행되는 시점에 약간의 지연과 예외 메세지 발생
	 */
	static {
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}

	public static void main(String[] args) {
		SpringApplication.run(CritApplication.class, args);
	}

}
