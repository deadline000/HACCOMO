package com.boot.haccomo.user.controller;

import com.boot.haccomo.user.dto.UserDTO;
import com.boot.haccomo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

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
}
