package com.boot.haccomo.user.repository;

import com.boot.haccomo.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserId(String userid);
}
