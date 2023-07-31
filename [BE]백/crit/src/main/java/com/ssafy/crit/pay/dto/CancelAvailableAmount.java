package com.ssafy.crit.pay.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class CancelAvailableAmount {
    private int total; // 전체 취소 가능 금액
    private int tax_free; // 취소 가능 비과세 금액
    private int vat; // 취소 가능 부가세 금액
    private int point; // 취소 가능 포인트 금액
    private int discount; // 취소 가능 할인 금액
    private int green_deposit; // 컵 보증금
}
