package com.boot.haccomo.user.service;

import com.boot.haccomo.user.dto.UserDTO;
import com.boot.haccomo.user.entity.UserEntity;
import com.boot.haccomo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

//    신규 가입
    public void register(UserDTO userDTO){
        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
        userRepository.save(userEntity);
    }

}
