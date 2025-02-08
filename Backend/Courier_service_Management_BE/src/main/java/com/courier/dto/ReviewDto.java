package com.courier.dto;

import lombok.Data;

@Data
public class ReviewDto extends BaseDto{

	private String reviewText;

	private int rating;
}
