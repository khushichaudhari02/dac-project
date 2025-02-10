package com.courier.services;

import com.courier.dto.PaymentRequestDto;
import com.courier.dto.PaymentResponseDto;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.repository.OrdersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private OrdersRepository ordersRepository;

    public PaymentResponseDto processPayment(Long orderId, PaymentRequestDto paymentRequestDto) {
        Optional<Orders> orderOptional = ordersRepository.findById(orderId);

        if (!orderOptional.isPresent()) {
            throw new RuntimeException("Order not found.");
        }

        Orders order = orderOptional.get();
        
        if (paymentRequestDto.getCardNo().length() != 16 || paymentRequestDto.getCvv().length() != 3) {
            throw new RuntimeException("Invalid card details.");
        }

        PaymentResponseDto response = new PaymentResponseDto();
        response.setOrderStatus(OrderStatus.PLACED);
        response.setPaymentDateTime(LocalDateTime.now());
        response.setTransactionId(UUID.randomUUID().toString());
        response.setAmount(paymentRequestDto.getAmount());

        // Update Order Status
        order.setStatus(OrderStatus.PLACED);
        ordersRepository.save(order);

        return response;
    }

    private boolean validatePayment(PaymentRequestDto paymentRequestDto) {
        // Simulate payment validation (this should integrate with a real payment gateway)
        return paymentRequestDto.getCardNo() != null && paymentRequestDto.getAmount() > 0;
    }
}
