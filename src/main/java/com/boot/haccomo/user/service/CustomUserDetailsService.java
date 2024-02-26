package com.boot.haccomo.user.service;

import com.boot.haccomo.user.dto.CustomUserDetails;
import com.boot.haccomo.user.entity.UserEntity;
import com.boot.haccomo.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//  UserDetailsService 인터페이스 구현
@Service
public class CustomUserDetailsService implements UserDetailsService {
    //db에 접근
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

//    사용자 조회
//    LoginFilter에서 attemptAuthentication(로그인) 호출 시, 내부에서 AuthenticationManager를 통해 호출
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        //DB에서 조회
        UserEntity userEntity = userRepository.findByUserId(userId);

        if(userEntity!=null){
            //AutneticationManager가 검증
            return new CustomUserDetails(userEntity);
        }
        return null;
    }
}
