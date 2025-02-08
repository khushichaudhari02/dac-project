package com.courier.custom_exception;

public class CustomAuthenticationException extends RuntimeException{
	public CustomAuthenticationException(String message) {
		super(message);
	}
}
