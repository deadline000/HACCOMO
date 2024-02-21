package com.boot.haccomo.user.entity;

import com.boot.haccomo.user.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //회원 고유번호

    @Column
    private String userId;

    @Column
    private String userPwd;

    @Column
    private String userPhone;

    @Column
    private String userNickname;

    @Column
    private String userEmail;

    @Column
    private String userRole;

    @Column
    private String userBirth;

    @CreatedDate //가입시간
    private LocalDateTime signupDate;

    @LastModifiedDate //마지막수정시간
    private LocalDateTime lastModifiedDate;

    @Column //마케팅수신동의여부
    private String marketingAgreement;

//    신규 가입
    public static UserEntity toUserEntity(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUserId(userDTO.getUserId());
        userEntity.setUserPwd(userDTO.getUserPwd());
        userEntity.setUserPhone(userDTO.getUserPhone());
        userEntity.setUserNickname(userDTO.getUserNickname());
        userEntity.setUserEmail(userDTO.getUserEmail());
        userEntity.setUserRole(userDTO.getUserRole());
        userEntity.setUserBirth(userDTO.getUserBirth());
        userEntity.setSignupDate(LocalDateTime.now()); // 가입시간 (가입 시점)
        userEntity.setMarketingAgreement(userDTO.getMarketingAgreement());

        return userEntity;
    }

//    회원정보 수정
    public static UserEntity toUpdateUserEntity(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        userEntity.setId(userDTO.getId()); //고유번호
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setUserPwd(userDTO.getUserPwd());
        userEntity.setUserPhone(userDTO.getUserPhone());
        userEntity.setUserNickname(userDTO.getUserNickname());
        userEntity.setUserEmail(userDTO.getUserEmail());
        userEntity.setUserRole(userDTO.getUserRole());
        userEntity.setUserBirth(userDTO.getUserBirth());
        userEntity.setLastModifiedDate(LocalDateTime.now()); // 마지막 수정 시간 (현재 시간)
        userEntity.setMarketingAgreement(userDTO.getMarketingAgreement());

        return userEntity;
    }

}










