package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.PaymentRequestDto;
import com.courier.dto.PaymentResponseDto;
import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.services.OrderService;
import com.courier.services.PaymentService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	private PaymentService paymentService;
	
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

@PostMapping("/place-order")
	public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequestDto requestDto) {
	    System.out.println("Received Order Request: " + requestDto);
	    try {
	        PlaceOrderResponseDto response = orderService.placeOrder(requestDto);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order: " + e.getMessage());
	    }
	}

	
	@PatchMapping("/confirm_order/{orderId}")
	public ResponseEntity<?> confirmOrder(@PathVariable Long orderId,
			@RequestBody PaymentRequestDto paymentRequestDto) {
		try {
            PaymentResponseDto paymentResponse = paymentService.processPayment(orderId, paymentRequestDto);

            if (paymentResponse == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment failed.");
            }
            return ResponseEntity.ok(paymentResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment: " + e.getMessage());
        }
    }


}
