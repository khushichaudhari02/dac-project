package com.courier.dto;

import java.util.Date;

import com.courier.pojos.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderResponseDto {
    public PlaceOrderResponseDto(String string) {
		// TODO Auto-generated constructor stub
	}
	public PlaceOrderResponseDto() {
		// TODO Auto-generated constructor stub
	}
	private Long orderId;
    private String trackingId;
    private Date orderDate;
    private Date deliveryDate;
    private String receiverName;
    private String contactNumber;
    private double weight;
    private Long fromWarehouseId;
    private Long toWarehouseId;
    private double price;
    private OrderStatus status;
	public void setFromWarehouseId(Long id) {
		// TODO Auto-generated method stub
		
	}
}
