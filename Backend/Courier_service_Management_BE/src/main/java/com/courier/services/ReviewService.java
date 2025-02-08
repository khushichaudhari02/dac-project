package com.courier.services;

import java.util.Optional;
//import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.ReviewDto;
import com.courier.pojos.Review;
import com.courier.pojos.Orders;
import com.courier.pojos.Users;
import com.courier.repository.OrdersRepository;
import com.courier.repository.ReviewRepository;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;
//import com.courier.exception.ResourceNotFoundException;

@Service
@Transactional
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ModelMapper mapper;

    public Optional<ReviewDto> addReview(ReviewDto reviewDto, Long orderId, Long userId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Review review = mapper.map(reviewDto, Review.class);
        review.setOrderId(order);
        review.setUserId(user);

        Review savedReview = reviewRepository.save(review);
        return Optional.of(mapper.map(savedReview, ReviewDto.class));
    }

    public Optional<ReviewDto> updateReview(ReviewDto reviewDto, Long reviewId) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review Not Found!"));
        
        existingReview.setReviewText(reviewDto.getReviewText());
        existingReview.setRating((byte) reviewDto.getRating());

        Review updatedReview = reviewRepository.save(existingReview);
        return Optional.of(mapper.map(updatedReview, ReviewDto.class));
    }
}