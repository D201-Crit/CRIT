package com.crit.oauthjwt2.common.security;

import com.crit.oauthjwt2.entity.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig{

    private final SecurityUtil securityUtil;
    private final UserRepository userRepository;

    @Value("app.auth.token-secret") private String key;
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .cors()
                .and()

                .authorizeRequests()
                .antMatchers("/api/auth/**", "/login/oauth2/**", "/h2-console/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())

                .and()
                .sessionManagement()//세션 정책 설정
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .addFilterBefore(new JwtFilter(securityUtil, userRepository), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}