package com.boot.haccomo.security.jwt;

import com.boot.haccomo.user.dto.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

//    로그인
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)throws AuthenticationException {
//        //클라이언트 요청에서 username(userId), password(userPwd) 추출
//        String username = obtainUsername(request);
//        String password = obtainPassword(request);
        // 클라이언트 요청에서 userId와 userPwd 추출
        String userId = request.getParameter("userId");
        String userPwd = request.getParameter("userPwd");

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
//        필요 데이터 : userId, userPwd, role
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId,userPwd,null);
        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }


    //로그인 성공 (JWT 발급)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        //유저 가져오기 오류 -> 타입변경
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = customUserDetails.getUsername();

//        userRole
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String userRole = auth.getAuthority();


        String token = jwtUtil.createJwt(userId, userRole, 60*60*10L); //토큰 유효기간

        //htpp 인증방식 : 접두사 +띄어쓰기 필수
        response.addHeader("Authorization", "Bearer " + token);
    }

    //로그인 실패
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        //로그인 실패시 401 응답 코드 반환
        response.setStatus(401);
    }
}
