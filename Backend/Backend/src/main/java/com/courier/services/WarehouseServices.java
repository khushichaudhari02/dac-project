package com.courier.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.pojos.Warehouse;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WarehouseServices {
	@Autowired
	private WarehouseRepository warehouseRepository;
	
	public List<Warehouse> getAllWarehouse(){
		return warehouseRepository.findAll();
	}
	

}
