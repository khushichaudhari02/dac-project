package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.dto.RegisterResponseDto;
import com.courier.pojos.Users;
import com.courier.services.OrderService;
import com.courier.services.UserService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
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
	
	@PostMapping("/register")
	public RegisterResponseDto registerUser(@RequestBody RegisterRequestDto userDto) {
		System.out.println(userDto);
		Users registeredUser = userService.registerUser(userDto);
		
		return new RegisterResponseDto("success");
	}
	
	@PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequestDto requestDto) {
        try {
            PlaceOrderResponseDto response = orderService.placeOrder(requestDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order: " + e.getMessage());
        }
    }


}
