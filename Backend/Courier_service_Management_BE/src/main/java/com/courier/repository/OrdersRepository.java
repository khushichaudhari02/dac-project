package com.courier.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Users;
//import com.courier.pojos.Warehouse;


public interface OrdersRepository extends JpaRepository<Orders, Long> {
	
	List<Orders> findByStatusAndDeliveryAgentId(OrderStatus status,Users user);
	
	List<Orders>findByDeliveryAgentIdAndStatusNot(Users user,OrderStatus status);
	
	Optional<Orders> findByTrackingId(String trackingId);
	
	
	}

