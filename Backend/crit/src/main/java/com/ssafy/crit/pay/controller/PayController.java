package com.ssafy.crit.pay.controller;

import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.pay.dto.KakaoApproveResponse;
import com.ssafy.crit.pay.dto.KakaoCancelResponse;
import com.ssafy.crit.pay.dto.KakaoReadyResponse;
import com.ssafy.crit.pay.service.PayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PayController {
    private final PayService payService;
    private final JwtProvider jwtProvider;

    @GetMapping("/pay")
    public ResponseEntity<KakaoReadyResponse> getPay(HttpServletRequest request, String amount) {
        // 추후 챌린지 정보에서 금액을 받아와서 로직 작성
        String token = request.getHeader("Authorization").substring(7);
        String userId = (String)jwtProvider.get(token).get("userId");
        return ResponseEntity.ok(payService.kakaoPayReady(userId, amount));
    }

    @GetMapping("/success")
    public ResponseEntity<KakaoApproveResponse> paySuccess(HttpServletRequest request, @RequestParam("pg_token") String pgToken) {
        // 만약 유저가 성공했다면 다시 해당 uri로 요청을 보내고 최종 승인 처리를 진행
        String token = request.getHeader("Authorization").substring(7);
        String userId = (String)jwtProvider.get(token).get("userId");
        return ResponseEntity.ok(payService.ApproveResponse(userId, pgToken));
    }
    
    @GetMapping("/fail")
    public String payFail() {
        return "payment/fail";
    }

    @GetMapping("/cancel")
    public String payCancel() {
        return "payment/cancel";
    }

    @GetMapping("/refund")
    public ResponseEntity<KakaoCancelResponse> refund(HttpServletRequest request, @RequestParam("amount") String amount) {
        // 추후 챌린지 정보에서 금액을 받아와서 로직 작성
        String token = request.getHeader("Authorization").substring(7);
        String userId = (String)jwtProvider.get(token).get("userId");
        return ResponseEntity.ok(payService.kakaoCancel(userId, amount));
    }
}
