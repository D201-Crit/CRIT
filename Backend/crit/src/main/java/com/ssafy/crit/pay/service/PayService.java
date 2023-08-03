package com.ssafy.crit.pay.service;

import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.pay.dto.KakaoApproveResponse;
import com.ssafy.crit.pay.dto.KakaoCancelResponse;
import com.ssafy.crit.pay.dto.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class PayService {

    private final UserRepository userRepository;
    static final String cid = "TC0ONETIME"; // 가맹점 테스트 코드
    @Value("86f8e70b2e6f309e47d76e82c0e84441")
    private String admin_Key;
    private KakaoReadyResponse kakaoReady;

    /**
     * 결제 요청
     */
    @Transactional
    public KakaoReadyResponse kakaoPayReady(String userId, String amount) {

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "crit_order_id");
        parameters.add("partner_user_id", "crit_user_id");
        parameters.add("item_name", "챌린지 결제");
        parameters.add("quantity", "1");
        parameters.add("total_amount", String.valueOf(amount));
        parameters.add("vat_amount", "0");
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:3000/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://localhost:3000/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://localhost:3000/payment/fail"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);
        // tid 저장
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("아이디가 존재 X"));
        user.updateTid(kakaoReady.getTid());
        return kakaoReady;
    }

    /**
    * 결제 승인
     */
    public KakaoApproveResponse ApproveResponse(String userId, String pgToken) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("아이디가 존재 X"));

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", user.getTid());
        parameters.add("partner_order_id", "crit_order_id");
        parameters.add("partner_user_id", "crit_user_id");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);

        return approveResponse;
    }

    /**
     * 결제 환불
     */
    public KakaoCancelResponse kakaoCancel(String userId, String amount) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("아이디가 존재 X"));

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", user.getTid());
        parameters.add("cancel_amount", String.valueOf(amount));
        parameters.add("cancel_tax_free_amount", "0");
        parameters.add("cancel_vat_amount", "0");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }


    /**
     * 카카오 요구 헤더값
     */
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + admin_Key;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }
}
