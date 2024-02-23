package com.boot.haccomo.user.service;

import com.boot.haccomo.user.dto.CustomUserDetails;
import com.boot.haccomo.user.entity.UserEntity;
import com.boot.haccomo.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    //db에 접근
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //DB에서 조회
        UserEntity userEntity = userRepository.findByUserId(username);

        if(userEntity!=null){
            //AutneticationManager가 검증
            return new CustomUserDetails(userEntity);
        }
        return null;
    }
}
