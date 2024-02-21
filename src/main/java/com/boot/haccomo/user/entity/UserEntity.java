package com.boot.haccomo.user.entity;

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
    private Long id;

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
    private String role;

    @Column
    private String birth;

    @CreatedDate //가입시간
    private LocalDateTime signupDate;

    @LastModifiedDate //마지막수정시간
    private LocalDateTime lastModifiedDate;

}










