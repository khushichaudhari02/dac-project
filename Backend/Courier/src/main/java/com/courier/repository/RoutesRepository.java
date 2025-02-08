package com.courier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Orders;
import com.courier.pojos.Routes;

public interface RoutesRepository extends JpaRepository<Routes, Long>{

	List<Routes> findByOrderId(Orders order);

}
