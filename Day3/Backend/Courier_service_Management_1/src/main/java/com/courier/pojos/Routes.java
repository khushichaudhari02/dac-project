package com.courier.pojos;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Routes")
public class Routes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;
	
	private LocalDate DispatchDate;
	
	private LocalDate ArrivalDate;
	
	private String Status;
	
	
	@OneToOne
	@JoinColumn(name="order_id",nullable = false)
	private Orders orderId;
	
	@OneToOne
	@JoinColumn(name="From_Wid",nullable = false)
	private Warehouse FromId;
	
	@OneToOne
	@JoinColumn(name="To_Wid",nullable = false)
	private Warehouse ToId;
	
	@OneToOne
	@JoinColumn(name="Delivery_AgentId",nullable = false)
	private Users DeliveryAgentId;
	
	
	

}
