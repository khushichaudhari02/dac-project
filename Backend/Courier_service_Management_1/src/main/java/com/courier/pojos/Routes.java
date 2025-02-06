package com.courier.pojos;

import java.util.Date;

import org.hibernate.annotations.ManyToAny;

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

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Route")
public class Routes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;
	
	private Date DispatchDate;
	
	private Date ArrivalDate;
	
	private String Status;
	
	
	@ManyToOne
	@JoinColumn(name="order_id",nullable = false)
	private Orders orderId;
	
	@ManyToOne
	@JoinColumn(name="From_Wid",nullable = false)
	private Warehouse FromId;
	
	@ManyToOne
	@JoinColumn(name="To_Wid",nullable = false)
	private Warehouse ToId;
	
	
	
	

}
