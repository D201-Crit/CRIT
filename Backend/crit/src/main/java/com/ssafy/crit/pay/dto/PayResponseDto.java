package com.ssafy.crit.pay.dto;

import com.ssafy.crit.pay.entity.Pay;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PayResponseDto {
    private String userName;
    private int price;
    private String payDate;

    public PayResponseDto(Pay pay){
        this.userName = pay.getUser().getNickname();
        this.price = pay.getPrice();
        this.payDate = pay.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"));
    }

}
