package com.courier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
 Optional <Warehouse> findByManager(Users manager);

}
