package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String contactNumber;
	private AddressDto address;
	

}
