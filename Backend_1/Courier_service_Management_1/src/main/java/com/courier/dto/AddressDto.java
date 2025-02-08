package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
	private Long id;
	private String flatNo;
	private String streetName;
	private String landmark;
	private String city;
	private String state;
	private int pincode;
}
