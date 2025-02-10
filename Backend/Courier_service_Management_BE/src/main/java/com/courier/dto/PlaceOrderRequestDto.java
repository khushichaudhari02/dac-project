package com.courier.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PlaceOrderRequestDto {
    private Long senderId; 
    private String receiverName;
    private String contactNumber;
    private double weight;
    private Long fromWarehouseId; 
    private Long toWarehouseId;   
    private double price;
	public Object getFromWarehouseName() {
		// TODO Auto-generated method stub
		return null;
	}
}
