package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

}
