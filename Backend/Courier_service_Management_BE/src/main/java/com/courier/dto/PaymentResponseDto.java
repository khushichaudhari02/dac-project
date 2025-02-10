package com.courier.dto;

import java.time.LocalDateTime;

import com.courier.pojos.OrderStatus;

import lombok.Data;

@Data
public class PaymentResponseDto extends BaseDto{

	private  OrderStatus orderStatus;
	
	private LocalDateTime paymentDateTime;
	
	private String transactionId;
	
	private Double amount;
	
	private String responseStatus; 
	// Getters and Setters
    public String getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(String responseStatus) {
        this.responseStatus = responseStatus;
    }

}
