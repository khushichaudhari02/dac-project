package com.courier.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
	private Date OrderDate;
	private Date DeliveryDate;
	private String Status;
	private String TrackingId;
	private double Price;
	private String ReceiverName;
	private String ContactNumber;
	private double Weight;
	private String Source;
	private String Destination;


}
