package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.courier.dto.ReviewDto;
import com.courier.services.ReviewService;
//import com.courier.exception.ApiException;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    
    @PostMapping("/add_review/{orderId}/{userId}")
    @Operation(description="Add review by user")
    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto, @PathVariable Long orderId, @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReview(reviewDto, orderId, userId)
                        .orElseThrow(() -> new RuntimeException("Internal server error")));
    }
    
    @PatchMapping("/update_review/{reviewId}")
    @Operation(description="Update review")
    public ResponseEntity<?> updateReview(@RequestBody ReviewDto reviewDto, @PathVariable Long reviewId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(reviewService.updateReview(reviewDto, reviewId)
                        .orElseThrow(() -> new RuntimeException("Internal server error")));
    }
}
