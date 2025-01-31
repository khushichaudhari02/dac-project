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
public class AddressDto {
	private String flatNo;
	private String streetName;
	private String landmark;
	private String city;
	private String state;
	private int pincode;
}
