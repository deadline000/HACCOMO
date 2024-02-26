package com.boot.haccomo.user.dto;

import com.boot.haccomo.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id; //회원 고유번호
    private String userId;
    private String userPwd;
    private String userPhone;
    private String userNickname;
    private String userEmail;
    private String userRole;
    private String userBirth;
    private String signupDate;
    private String lastModifiedDate;
    private String marketingAgreement; //마케팅수신동의여부

//    테이블에서 조회한 엔티티를 dto 객체로 변환
    public static UserDTO toUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();

        userDTO.setId(userDTO.getId()); //고유번호
        userDTO.setUserId(userEntity.getUserId()); //아이디
        userDTO.setUserPwd(userEntity.getUserPwd()); //비밀번호
        userDTO.setUserPhone(userEntity.getUserPhone()); //전화번호
        userDTO.setUserNickname(userEntity.getUserNickname()); //닉네임
        userDTO.setUserEmail(userEntity.getUserEmail()); //이메일
        userDTO.setUserRole(userEntity.getUserRole()); //role
        userDTO.setUserBirth(userDTO.getUserBirth()); //생년월일
        userDTO.setSignupDate(formatDate(userEntity.getSignupDate())); // 가입시간 포맷
        userDTO.setLastModifiedDate(formatDate(userEntity.getLastModifiedDate())); // 마지막수정시간 포맷
        userDTO.setMarketingAgreement(userDTO.getMarketingAgreement()); //마케팅수신여부

        return userDTO;
    }

//   엔티티의 LocalDateTime을 문자열로 포맷
    private static String formatDate(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "";
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return dateTime.format(formatter);
    }
}


















