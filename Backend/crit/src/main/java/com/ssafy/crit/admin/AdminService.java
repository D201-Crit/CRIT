package com.ssafy.crit.admin;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.crit.auth.dto.LogInRequestDto;
import com.ssafy.crit.auth.dto.LogInResponseDto;
import com.ssafy.crit.auth.dto.TokenDto;
import com.ssafy.crit.auth.entity.User;
import com.ssafy.crit.auth.entity.enumType.AuthProvider;
import com.ssafy.crit.auth.entity.enumType.Grade;
import com.ssafy.crit.auth.entity.enumType.Role;
import com.ssafy.crit.auth.jwt.JwtProvider;
import com.ssafy.crit.auth.repository.UserRepository;
import com.ssafy.crit.common.exception.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

	private AdminRepository adminRepository;
	private JwtProvider jwtProvider;

	// Admin 생성
	public AdminSaveResponseDto save (AdminSaveRequestDto adminSaveRequestDto){

		SuperAdmin superAdmin = SuperAdmin.builder()
			.id(adminSaveRequestDto.getAminId())
			.password(adminSaveRequestDto.getPassword())
			.role(Role.ADMIN)
			.grade(Grade.Administrator)
			.authProvider(AuthProvider.EMPTY)
			.build();

		adminRepository.save(superAdmin);

		return AdminSaveResponseDto.builder()
			.amdinId(superAdmin.getId())
			.role(superAdmin.getRole().getTitle())
			.grade(superAdmin.getGrade().getTitle())
			.build();
	}

	// Admin Login
	public AdminLogInResponseDto logIn(AdminLoginRequestDto adminLogInRequestDto) throws Exception{
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		if (!adminRepository.existsById(adminLogInRequestDto.getId())) {
			throw new BadRequestException("존재하지 않는 아이디입니다.");
		}

		SuperAdmin superAdmin = adminRepository.findById(adminLogInRequestDto.getId()).get();
		if (!bCryptPasswordEncoder.matches(adminLogInRequestDto.getPassword(), superAdmin.getPassword())) {
			throw new BadRequestException("존재하지 않는 비밀번호입니다.");
		}

		// 토큰 발급
		TokenDto accessTokenDto = jwtProvider.createAccessToken(adminLogInRequestDto.getId(), superAdmin.getAuthProvider());
		TokenDto refreshTokenDto = jwtProvider.createRefreshToken(adminLogInRequestDto.getId(), superAdmin.getAuthProvider());

		superAdmin.updateRefreshToken(refreshTokenDto.getToken(), refreshTokenDto.getTokenExpirationTime());

		return AdminLogInResponseDto.builder()
			.id(superAdmin.getId())
			.accessToken(accessTokenDto.getToken())
			.refreshToken(refreshTokenDto.getToken())
			.refreshTokenExpirationTime(refreshTokenDto.getTokenExpirationTime())
			.grade(superAdmin.getGrade())
			.build();
	}

	// 챌린지 삭제
	// public publicString deleteChallenge (SuperAdmin superAdmin){

	// }
}
