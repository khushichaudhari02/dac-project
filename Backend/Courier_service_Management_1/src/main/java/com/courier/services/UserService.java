package com.courier.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.LoginRequestDto;
import com.courier.pojos.Users;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public Users login(LoginRequestDto dto) {
		Users user = userRepository.findByEmailAndPassword(dto.getEmail(),dto.getPassword());
		return user;
	}
	

}
