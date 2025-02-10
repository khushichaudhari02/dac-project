package com.courier.dto;

import lombok.Data;
@Data
public class PaymentRequestDto extends BaseDto {

		private Double amount;
		
		private String cardNo;
		
		private String cardHolderName;
		
		private String expiryDate;
		
		private String cvv;
		

	}