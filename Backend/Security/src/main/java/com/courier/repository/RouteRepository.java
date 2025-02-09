package com.courier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Warehouse;

public interface RouteRepository extends JpaRepository<Routes, Long> {
    List<Routes> findByToIdAndStatus(Warehouse warehouse, RoutesStatus status);
    
    List<Routes> findByFromIdAndStatus(Warehouse fromId, RoutesStatus status);

   Routes findRoutesByFromIdAndStatus(Warehouse fromId, RoutesStatus status);

}


