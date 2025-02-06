package com.courier.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.LoginRequestDto;
import com.courier.dto.LoginResponseDto;
import com.courier.pojos.Users;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public LoginResponseDto login(LoginRequestDto dto) {
		Users user = userRepository.findByEmailAndPassword(dto.getEmail(),dto.getPassword());
		if(user!=null) {
			return new LoginResponseDto("success", user);
		}
		return new LoginResponseDto("failed", user);
	}

	public LoginResponseDto updateProfile(Users user) {
		Users persistantUser=userRepository.findById(user.getId()).orElseThrow();
		persistantUser.setAddress(user.getAddress());
		persistantUser.setContactNumber(user.getContactNumber());
		persistantUser.setFirstName(user.getFirstName());
		persistantUser.setLastName(user.getLastName());
		userRepository.save(persistantUser);
		return new LoginResponseDto("success", persistantUser);
	}

	public LoginResponseDto getProfile(Long id) {
		Users user = userRepository.findById(id).orElseThrow();
		return new LoginResponseDto("success", user);
	}
	
	

}
