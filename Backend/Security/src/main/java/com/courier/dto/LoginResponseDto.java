package com.courier.dto;

import com.courier.pojos.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginResponseDto {
	private String status;
	private String token;
	private Users user;
	
	public LoginResponseDto(String status,String token) {
		this.status=status;
		this.token=token;
	}
	public LoginResponseDto(String status,Users user) {
		this.status=status;
		this.user=user;
	}

}


//public LoginResponseDto login(LoginRequestDto dto) {
//    Authentication authentication = authManager.authenticate(
//        new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
//    );
//
//    if (authentication.isAuthenticated()) {
//        String token = jwtService.generateToken(authentication);
//        return new LoginResponseDto("success", token); // Ensure this matches frontend expectations
//    }
//    return new LoginResponseDto("failed", "");
//}
