package com.courier.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.OrderDto;
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
	
	@Autowired
	private ModelMapper modelMapper;
	public List<OrderDto> getAllOrders(){
		 List<Orders> orders = ordersRepository.findAll();
	     List<OrderDto> ordersDto=orders.stream()
	                .map(order -> modelMapper.map(order, OrderDto.class)) 
	                .collect(Collectors.toList());
	     for(int i=0;i<orders.size();i++) {
	    	 ordersDto.get(i).setSource(orders.get(i).getFromWarehouse().getLocation().getCity());
	    	 ordersDto.get(i).setDestination(orders.get(i).getToWarehouse().getLocation().getCity());
	        }
		return ordersDto;
	}
	
	public List<Orders> getByStatusAndAgentId(Long id){
		Users user = usersRepository.findById(id).orElseThrow();
		return ordersRepository.findByStatusAndDeliveryAgentId(OrderStatus.DELIVERED, user);
	}
	
	public List<Orders> getByStatusNotAndAgentId(Long id){
		Users user = usersRepository.findById(id).orElseThrow();
		return ordersRepository.findByDeliveryAgentIdAndStatusNot(user, OrderStatus.DELIVERED);
	}
	
	 public void updateOrderStatus(Long orderId) {
	        Orders order = ordersRepository.findById(orderId).orElseThrow();
	        List<Routes> routes = routesRepository.findByOrderId(order);
	        for(Routes route: routes) {
	        	route.setStatus(RoutesStatus.DELIVERED);
	        	routesRepository.save(route);
	        }
	        
	        order.setStatus(OrderStatus.DELIVERED);
	        ordersRepository.save(order);
	    }
	
}
