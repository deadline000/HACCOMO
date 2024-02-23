package com.boot.haccomo.user.controller;

import com.boot.haccomo.security.jwt.JWTUtil;
import com.boot.haccomo.user.dto.CustomUserDetails;
import com.boot.haccomo.user.dto.UserDTO;
import com.boot.haccomo.user.service.CustomUserDetailsService;
import com.boot.haccomo.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final BCryptPasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;

    public UserController(JWTUtil jwtUtil, UserService userService,BCryptPasswordEncoder passwordEncoder,CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
    }

    // 신규 가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO){

        log.info(userDTO.getUserId());

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
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        try {
//            받은 userId 값으로 계정 조회
            UserDTO userDTO1 = userService.findByUserId(userDTO.getUserId());

            // 계정 있을 경우
            if (userDTO1 != null){
                if (passwordEncoder.matches(userDTO.getUserPwd(),userDTO1.getUserPwd())){
                    //로그인 성공 + jwt 토큰 생성 (유효시간 24시간)
                    String token = jwtUtil.createJwt(userDTO1.getUserId(), userDTO1.getUserRole(), 86400000L);

                    // Map에 토큰과 유저 정보를 넣어서 전송
                    Map<String, Object> responseMap = new HashMap<>();
                    responseMap.put("token", token);
                    responseMap.put("user", userDTO1);

                    return ResponseEntity.ok().body(responseMap);
                }else {
                    return ResponseEntity.ok().body("noPwd"); //비밀번호 틀림
                }
            }else { //아이디 없을 경우
                return ResponseEntity.ok().body("noId"); //없는 계정
            }
        } catch (Exception e) {
            log.error("로그인 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failure");
        }

    }
}
