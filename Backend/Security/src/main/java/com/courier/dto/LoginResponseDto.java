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
