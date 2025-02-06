package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.services.WarehouseServices;

@RestController
@RequestMapping("/")
public class WarehouseController {
	@Autowired
	private WarehouseServices warehouseServices;
	
	@GetMapping("/admin/warehouse")
	public ResponseEntity<?> getAllWarehouse(){
		return ResponseEntity.ok(warehouseServices.getAllWarehouse());
	}

}