package com.boot.haccomo.user.service;

import com.boot.haccomo.user.dto.UserDTO;
import com.boot.haccomo.user.entity.UserEntity;
import com.boot.haccomo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository,BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

//    아이디 중복 체크
    public Boolean existsByUserId(String userId){
        if(userRepository.existsByUserId(userId)){
            return true;
        }else {
            return false;
        }
    }

//    신규 가입
    public void register(UserDTO userDTO){

        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
        userEntity.setUserPwd(bCryptPasswordEncoder.encode(userEntity.getUserPwd()));
        userRepository.save(userEntity);
    }

//    아이디로 회원 조회
    public UserDTO findByUserId(String userid){
        UserEntity userEntity = userRepository.findByUserId(userid);
        UserDTO userDTO = new UserDTO();
        if (userEntity != null){
            userDTO = UserDTO.toUserDTO(userEntity);
            return userDTO;
        }else {
            return null;
        }
    }

}
