package com.crit.oauthjwt2.common.security;

import com.crit.oauthjwt2.dto.TokenDto;
import com.crit.oauthjwt2.enumType.AuthProvider;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;

@Component
@RequiredArgsConstructor
public class SecurityUtil {
    @Value("app.auth.token-secret") private String secret;

    private static final Long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60L; // 1 hours
    private static final Long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30L; // 30 days

    public TokenDto createAccessToken(String userId, AuthProvider provider) {
        System.out.println("====createAccessToken=====" + provider + "===========");
        HashMap<String, Object> claim = new HashMap<>();
        claim.put("userId", userId);
        claim.put("provider", provider);
        return createJwt("ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION_TIME, claim);
    }

    public TokenDto createRefreshToken(String userId, AuthProvider provider) {
        HashMap<String, Object> claim = new HashMap<>();
        claim.put("userId", userId);
        claim.put("provider", provider);
        return createJwt("REFRESH_TOKEN", REFRESH_TOKEN_EXPIRATION_TIME, claim);
    }

    public TokenDto createJwt(String subject, Long expiration, HashMap<String, Object> claim) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, secret);
        // claim 없는 경우 추가
        if (claim != null) {
            jwtBuilder.setClaims(claim);
        }
        // 기간
        Date date = null;
        if (expiration != null) {
            date = new Date(new Date().getTime() + expiration);
            jwtBuilder.setExpiration(date);
        }
        String token = jwtBuilder.compact();
        return new TokenDto(token, date);
    }

    /**
     * 복호화
     */
    public Claims get(String jwt) throws JwtException {
        return Jwts
                .parser()
                .setSigningKey(secret)
                .parseClaimsJws(jwt)
                .getBody();
    }

    /**
     * 토큰 만료 여부 체크
     *
     * @return true : 만료됨, false : 만료되지 않음
     */
    public boolean isExpiration(String jwt) throws JwtException {
        try {
            return get(jwt).getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    /**
     * Refresh token refresh 여부 확인
     * 만료일 7일 이내 일 경우 refresh token 재발급
     */
    public boolean canRefresh(String refreshToken) throws JwtException {
        Claims claims = get(refreshToken);
        long expirationTime = claims.getExpiration().getTime();
        long weekTime = 1000 * 60 * 60 * 24 * 7L;

        return new Date().getTime() > (expirationTime - weekTime);
    }

    public String getUserId(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token)
                .getBody().get("userId", String.class);
    }
}
