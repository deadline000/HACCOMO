package com.boot.haccomo.security.jwt;

import com.boot.haccomo.user.dto.CustomUserDetails;
import com.boot.haccomo.user.entity.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //request에서 Authorization 헤더를 찾음 (키값 뽑아오기)
        String authorization= request.getHeader("Authorization");

        //Authorization 헤더 검증 (토큰이 있는지 없는지)
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            //접두사가 이상하거나,  null이거나
            System.out.println("token null");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //띄어쓰기로부터 앞부분과 뒷부분의 두개 인덱스를 가지는 리스트가 생성되는데 리스트중 2번째인 1번을 토큰으로 받음.
        //Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {

            System.out.println("token expired");
            filterChain.doFilter(request, response); //다음필터에게 넘겨줌.

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //두개의 if를 거쳐 정상적인 토큰임을 확인.

        //토큰에서 username과 role 획득
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        //userEntity를 생성하여 값 set
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(username);
        userEntity.setUserPwd("temppassword"); //비밀번호는 토큰에 없음 -> 임시로 넣어줌.
        userEntity.setUserRole(role);

        //UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);
        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        //세션에 사용자 등록(세션 생성)
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);

    }
}
