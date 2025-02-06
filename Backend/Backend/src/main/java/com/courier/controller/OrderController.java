package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.services.OrderService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/admin/orders")
	public ResponseEntity<?> getAllOrders(){
		return ResponseEntity.ok(orderService.getAllOrders());
	}
	
	@GetMapping("/delivery/history/{id}")
	public ResponseEntity<?> getByStatusAndAgentId(@PathVariable Long id){
		return ResponseEntity.ok(orderService.getByStatusAndAgentId(id));
		
	}
	
	@GetMapping("/delivery/deliveries/{id}")
	public ResponseEntity<?> getByStatusNotAndAgentId(@PathVariable Long id){
		return ResponseEntity.ok(orderService.getByStatusNotAndAgentId(id));
		
	}
	
	 @PutMapping("/update-status/{orderId}")
	    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId) {
	        orderService.updateOrderStatus(orderId);
	        return ResponseEntity.ok().build();
	    }
	

}
