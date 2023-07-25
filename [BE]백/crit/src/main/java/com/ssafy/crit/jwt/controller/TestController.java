package com.ssafy.crit.jwt.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String getTest() {
        System.out.println("===================testing=====================");
        return "success Test";
    }
}
