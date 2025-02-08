package com.courier.pojos;

//import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "review")
@Data
public class Review extends BaseEntity{
	@Column(nullable = false)
	private byte rating;

	@Column(length = 50)
	private String reviewText;
	
	// Review * <-----------> 1 Orders
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Orders orderId;
	
	
	// Review 1 <----> 1 User
			@OneToOne(fetch = FetchType.LAZY) // mandatory
			@JoinColumn(name = "user_id")
			private Users userId;
}