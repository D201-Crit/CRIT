package com.crit.oauthjwt2.entity;

import com.crit.oauthjwt2.enumType.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
    Optional<User> findByRefreshToken(String refreshToken);
    boolean existsById(String id);
    boolean existsByPassword(String password);
    boolean existsByIdAndAuthProvider(String id, AuthProvider authProvider);
}
