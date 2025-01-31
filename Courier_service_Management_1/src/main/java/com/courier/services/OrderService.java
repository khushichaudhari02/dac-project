package com.courier.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Users;
import com.courier.repository.OrdersRepository;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private UserRepository usersRepository;
	
	
	public List<Orders> getAllOrders(){
		return ordersRepository.findAll();
	}
	
	public List<Orders> getByStatusAndAgentId(Long id){
		Users user = usersRepository.findById(id).orElseThrow();
		return ordersRepository.findByStatusAndDeliveryAgentId(OrderStatus.DELIVERED, user);
	}
	
	public List<Orders> getByStatusNotAndAgentId(Long id){
		Users user = usersRepository.findById(id).orElseThrow();
		return ordersRepository.findByDeliveryAgentIdAndStatusNot(user, OrderStatus.DELIVERED);
	}
	
	
}
