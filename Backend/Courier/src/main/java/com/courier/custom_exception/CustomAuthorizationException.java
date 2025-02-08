package com.courier.custom_exception;

public class CustomAuthorizationException extends RuntimeException{
	public CustomAuthorizationException(String message) {
		super(message);
	}
}