package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.LoginRequestDto;
import com.courier.dto.LoginResponseDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.dto.RegisterResponseDto;
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
		Users user = userService.login(dto);
		System.out.println(user);
		if(user!=null) {
			return new LoginResponseDto("success", user);
		}
		return new LoginResponseDto("failed", user);
	}

	@PostMapping("/register")
    public RegisterResponseDto registerUser(@RequestBody RegisterRequestDto userDto) {
        Users registeredUser = userService.registerUser(userDto);
        return new RegisterResponseDto("success");
    }
}
