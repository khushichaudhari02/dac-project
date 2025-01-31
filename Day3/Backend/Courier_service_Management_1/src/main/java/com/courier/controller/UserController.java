package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.LoginRequestDto;
import com.courier.dto.LoginResponseDto;
import com.courier.pojos.Users;
import com.courier.services.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/login")
	public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
		
		return userService.login(dto);
		
	}
	
	@PostMapping("/updateprofile")
	public LoginResponseDto updateProfile(@RequestBody Users user) {
		
		System.out.println(user.getId());
		
		return userService.updateProfile(user);
		
	}
	
	@GetMapping("/profile/{id}")
	public LoginResponseDto getProfile(@PathVariable Long id) {
		
		return userService.getProfile(id);
		
	}

}
