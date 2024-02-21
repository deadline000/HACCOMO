package com.boot.haccomo.user.dto;

import com.boot.haccomo.user.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String userId;
    private String userPwd;
    private String userPhone;
    private String userNickname;
    private String userEmail;
    private String role;
    private String birth;
    private LocalDateTime signupDate;
    private LocalDateTime lastModifiedDate;

    public static UserDTO toUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();

        userDTO.setUserId(userEntity.getUserId()); //아이디
        userDTO.setUserPwd(userEntity.getUserPwd()); //비밀번호
        userDTO.setUserPhone(userEntity.getUserPhone()); //전화번호
        userDTO.setUserNickname(userEntity.getUserNickname()); //닉네임
        userDTO.setUserEmail(userEntity.getUserEmail()); //이메일
        return userDTO;
    }
}


















