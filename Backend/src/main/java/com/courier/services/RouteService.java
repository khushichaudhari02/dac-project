package com.courier.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.pojos.Orders;
import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;

import com.courier.repository.OrdersRepository;
import com.courier.repository.RouteRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RouteService {
	@Autowired

	private RouteRepository routeRepository;
	@Autowired

	private WarehouseRepository warehouseRepository;
	@Autowired

	private OrdersRepository ordersRepository;
	
	 @Autowired
	    private UserRepository userRepository;
 
	 public List<Routes> getRoutesByWarehouseAndStatus(Long warehouseId) {
	        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow();
	        List<Routes> placedRoute = routeRepository.findByToIdAndStatus(warehouse, RoutesStatus.PLACED);
	        List<Routes> acceptRoute = routeRepository.findByToIdAndStatus(warehouse, RoutesStatus.ACCEPTED);
	        if (placedRoute.isEmpty()) {
	            return acceptRoute;
	        }
	        return placedRoute;
	    }

	    public Routes acceptOrder(Long routeId) {
	        Routes route = routeRepository.findById(routeId).orElseThrow();
	        Orders order= ordersRepository.findById(route.getOrderId().getId()).orElseThrow();
	        if(order.getToWarehouse().getId()==route.getToId().getId()) {
	        	route.setStatus(RoutesStatus.REACHED);
	        }
	        else {
	        route.setStatus(RoutesStatus.ACCEPTED);
	        }
	        route.setArrivalDate(LocalDateTime.now());
	        return routeRepository.save(route);
	    }
	    
	    public Routes forwardOrder(Long routeId) {
	        Routes route = routeRepository.findById(routeId).orElseThrow();
	        
	        if (route.getStatus() != RoutesStatus.ACCEPTED) {
	            throw new IllegalStateException("The order cannot be forwarded unless its status is ACCEPTED.");
	        }
	        
	        route.setStatus(RoutesStatus.FORWARDED);
	        route.setDispatchDate(LocalDateTime.now());
	        routeRepository.save(route);
	        Long toId = route.getToId().getId();
	        Warehouse warehouse = warehouseRepository.findById(toId).orElseThrow();
	        Routes routeToID = routeRepository.findRoutesByFromIdAndStatus(warehouse, RoutesStatus.NOT_REACHED);
	        routeToID.setStatus(RoutesStatus.PLACED);
	        return routeRepository.save(route);
	    }
	    

	    public Warehouse getWarehouseByUserId(Long userId) {
	        Users manager = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        return warehouseRepository.findByManager(manager);
	    }

	    public List<Routes> getRoutesByWarehouseAndStatus(Long warehouseId, RoutesStatus status) {
	        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow();
	        return routeRepository.findByToIdAndStatus(warehouse, status);
	    }


}



