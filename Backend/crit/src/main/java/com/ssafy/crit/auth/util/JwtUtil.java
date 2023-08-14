package com.ssafy.crit.auth.util;

import com.ssafy.crit.auth.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class JwtUtil {
    public static String getMemberId(String token, String key) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token)
                .getBody().get("id", String.class);
    }

    public static boolean isExpired(String token, String key) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }

    public static String creatJwt(String id, String secretKey, Long exTime) {
        Claims claims = Jwts.claims();
        claims.put("id", id);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + exTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
