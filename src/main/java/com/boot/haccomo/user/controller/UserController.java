package com.boot.haccomo.user.controller;

import com.boot.haccomo.security.jwt.JWTUtil;
import com.boot.haccomo.user.dto.CustomUserDetails;
import com.boot.haccomo.user.dto.UserDTO;
import com.boot.haccomo.user.service.CustomUserDetailsService;
import com.boot.haccomo.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private  final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserController(JWTUtil jwtUtil
                            ,UserService userService
                            ,AuthenticationManager authenticationManager) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    // 가입 시 아이디 중복체크
    @GetMapping("/userIdCheck")
    public ResponseEntity<Integer> userIdCheck(@RequestParam String userId){
        try {
            if (userService.existsByUserId(userId)) {
                return ResponseEntity.ok(0); //중복 아이디 존재 (회원가입 불가능)
            }else if (userId.isEmpty()) {
                return ResponseEntity.ok(2); //입력값 null
            }else{
                return ResponseEntity.ok(1); //중복 아이디 없음 (회원가입 가능)
            }
        } catch (Exception e) {
            log.error("중복검사 00에러", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(3);
        }

    }

    // 신규 가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO){

        try {
            userService.register(userDTO);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            log.error("회원가입 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failure");
        }

    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            // userId, userPwd를 토큰으로 변환
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDTO.getUserId(), userDTO.getUserPwd());

            // AuthenticationManager를 통해 인증 시도
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // 인증 성공한 경우
            if (authentication.isAuthenticated()) {

                SecurityContextHolder.getContext().setAuthentication(authentication);

                // UserDTO에서 필요한 정보 추출
                CustomUserDetails authenticatedUser = (CustomUserDetails) authentication.getPrincipal();

                // 로그인 성공 + jwt 토큰 생성 (유효시간 24시간)
                String token = jwtUtil.createJwt(authenticatedUser.getUsername(), authenticatedUser.getAuthorities().iterator().next().getAuthority(), 86400000L);

                // Map에 토큰과 유저 정보를 넣어서 전송
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("token", token);
                responseMap.put("userId", authenticatedUser.getUsername());
                responseMap.put("userNickname", authenticatedUser.getUserNickname());
                responseMap.put("userRole", authenticatedUser.getAuthorities().iterator().next().getAuthority());

                log.info("*********"+authenticatedUser.getAuthorities().iterator().next().getAuthority());

                return ResponseEntity.ok().body(responseMap);

            } else { // 인증 실패
                return ResponseEntity.ok().body("loginFailed");
            }
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
            return ResponseEntity.ok().body("loginFailed");
        } catch (UsernameNotFoundException e) {
            // 아이디가 없는 경우
            return ResponseEntity.ok().body("loginFailed");
        } catch (Exception e) {
            log.error("로그인 실패!!!!!!!!!!!!!!!", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
        }
    }

//    회원 조회 (토큰 검증)
    @GetMapping("/info")
    public ResponseEntity<UserDTO> userInfo(@RequestHeader(name = "Authorization") String token) {

        if (jwtUtil.isExpired(token)) {
            // 토큰 유효성 검사
//            토큰 유효만료 시
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String userId = jwtUtil.getUserId(token);
        if (userId == null) {
            // 토큰에서 userId 추출
//            토큰에 userId가 없을 시 (부적절한 토큰)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        UserDTO userDTO = userService.findByUserId(userId);
        if (userDTO == null) {
            // userId를 사용하여 회원 정보 조회
//            DB에 해당 userId 계정이 없을 시
            return ResponseEntity.notFound().build();
        }
        log.info("가입일 -------> "+userDTO.getSignupDate());
        return ResponseEntity.ok(userDTO);
    }

}
