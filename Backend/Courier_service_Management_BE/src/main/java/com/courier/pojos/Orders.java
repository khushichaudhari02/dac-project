package com.courier.pojos;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Entity
@Table(name="Orders")
public class Orders {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column(name="Order_Date")
	private Date orderDate;
	
	@Column(name="Delivery_Date")
	private Date deliveryDate;
	
	
	@Column(unique = true, nullable = false)
    private String trackingId = UUID.randomUUID().toString();
	
	private double price;
	
	@Column(name="Receiver_Name")
	private String receiverName;
	
	@Column(name="Contact_Number")
	private String contactNumber;
	
	private double Weight;
	@OneToOne
	private Warehouse toWarehouse;
	@OneToOne
	private Warehouse fromWarehouse;
	
	@ManyToOne
	@JoinColumn(name="sender_id",nullable=false)
	@JsonIgnore
	private Users senderId;
	@ManyToOne
	@JoinColumn(name="Delivery_AgentId")
	private Users deliveryAgentId;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	
	

	
}
