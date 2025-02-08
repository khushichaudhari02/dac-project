package com.courier.custom_exception;

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String messgae) {
		super(messgae);
	}
}
