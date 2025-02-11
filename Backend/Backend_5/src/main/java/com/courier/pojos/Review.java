package com.courier.pojos;

//import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "review")
@Data
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private byte rating;

	@Column(length = 50)
	private String reviewText;
	
	
	@OneToOne
	@JoinColumn(name = "order_id")
	private Orders orderId;
	
	
			@OneToOne(fetch = FetchType.LAZY) // mandatory
			@JoinColumn(name = "user_id")
			private Users userId;
}