package com.courier.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.LoginRequestDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.pojos.Users;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelmapper;
	
	public Users login(LoginRequestDto dto) {
		Users user = userRepository.findByEmailAndPassword(dto.getEmail(),dto.getPassword());
		return user;
	}
	
	public Users registerUser(RegisterRequestDto userDto) {
        Users user = modelmapper.map(userDto, Users.class);
        return userRepository.save(user);
    }
}
