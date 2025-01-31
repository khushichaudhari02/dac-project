package com.courier.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	private int Id;
	
	@Column(name="Order_Date")
	private LocalDate OrderDate;
	
	@Column(name="Delivery_Date")
	private LocalDate DeliveryDate;
	
	private String Status;
	
	@Column(name="Tracking_id")
	private String TrackingId;
	
	private double Price;
	
	@Column(name="Receiver_Name")
	private String ReceiverName;
	
	@Column(name="Contact_Number")
	private String ContactNumber;
	
	private double Weight;
	@OneToOne
	private Warehouse ToWarehouse;
	@OneToOne
	private Warehouse FromWarehouse;
	
	@ManyToOne
	@JoinColumn(name="sender_id",nullable=false)
	private Users SenderId;
	
	
	
	

	
}
