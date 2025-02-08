package com.courier.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
import com.courier.repository.OrdersRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private UserRepository usersRepository;
	
	@Autowired
	private WarehouseRepository warehouseRepository;
	
	
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
	
	
	
	public PlaceOrderResponseDto placeOrder(PlaceOrderRequestDto requestDTO) {
		try {
        // Fetch sender user
        Users senderId = usersRepository.findById(requestDTO.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        // Fetch warehouses
        Warehouse fromWarehouse = warehouseRepository.findById(requestDTO.getFromWarehouseId())
                .orElseThrow(() -> new RuntimeException("Source warehouse not found"));

        Warehouse toWarehouse = warehouseRepository.findById(requestDTO.getToWarehouseId())
                .orElseThrow(() -> new RuntimeException("Destination warehouse not found"));

       
        Orders order = new Orders();
        order.setOrderDate(new Date());
        order.setDeliveryDate(null);
        order.setTrackingId(UUID.randomUUID().toString());
        order.setReceiverName(requestDTO.getReceiverName());
        order.setContactNumber(requestDTO.getContactNumber());
        order.setWeight(requestDTO.getWeight());
        order.setFromWarehouse(fromWarehouse);
        order.setToWarehouse(toWarehouse);
        order.setSenderId(senderId);
        order.setPrice(requestDTO.getPrice());
        order.setStatus(OrderStatus.DELIVERED);

        Orders savedOrder = ordersRepository.save(order);

        PlaceOrderResponseDto responseDTO = new PlaceOrderResponseDto();
        responseDTO.setOrderId(savedOrder.getId());
        responseDTO.setTrackingId(savedOrder.getTrackingId());
        responseDTO.setOrderDate(savedOrder.getOrderDate());
        responseDTO.setDeliveryDate(savedOrder.getDeliveryDate());
        responseDTO.setReceiverName(savedOrder.getReceiverName());
        responseDTO.setContactNumber(savedOrder.getContactNumber());
        responseDTO.setWeight(savedOrder.getWeight());
        responseDTO.setFromWarehouseId(fromWarehouse.getId());
        responseDTO.setToWarehouseId(toWarehouse.getId());
        responseDTO.setPrice(savedOrder.getPrice());
        responseDTO.setStatus(savedOrder.getStatus());

        return responseDTO;
    
    } 
	catch (Exception e) {
        // Log the error
        System.err.println("Error while placing order: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException("Error while placing order");
    }
}
}
	
