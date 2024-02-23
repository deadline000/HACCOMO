package com.boot.haccomo.security.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private final SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}")String secret){
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    //토큰 검증 메소드 3개
    public String getUsername(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Boolean isExpired(String token) { //토큰 소멸 여부 확인

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    //로그인이 성공했을 때 정보를 전달받아서 토큰 생성
    public String createJwt(String username, String role, Long expiredMs) { //expiredMs 토큰이 살아있을 시간

        return Jwts.builder() //빌더로 토큰 만듦.
                .claim("username", username) //claim 으로 데이터 넣기
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis())) //토큰 발행 시간 넣기(현재)
                .expiration(new Date(System.currentTimeMillis() + expiredMs)) //토큰 발행 시간 + 인자로 받은 토큰 유지 기간
                .signWith(secretKey) //암호화 진행
                .compact(); //토큰 compact시켜서 리턴
    }
}
