package com.courier.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
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
	    private UserRepository userRepository;

//	public List<Routes> getRoutesByWarehouseAndStatus(Long warehouseId) {
//		Warehouse warehouse=warehouseRepository.findById(warehouseId).orElseThrow();
//        return routeRepository.findByToIdAndStatus(warehouse, RoutesStatus.PLACED);
//    }
//	
//	 public Routes acceptOrder(Long routeId) {
//	        Routes route = routeRepository.findById(routeId).orElseThrow();
//	        route.setStatus(RoutesStatus.ACCEPTED);
//	        return routeRepository.save(route);
//	    }
//	 
//	 
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
	        route.setStatus(RoutesStatus.ACCEPTED);
	        return routeRepository.save(route);
	    }
	    
	    public Routes forwardOrder(Long routeId) {
	        Routes route = routeRepository.findById(routeId).orElseThrow();
	        
	        if (route.getStatus() != RoutesStatus.ACCEPTED) {
	            throw new IllegalStateException("The order cannot be forwarded unless its status is ACCEPTED.");
	        }
	        
	        route.setStatus(RoutesStatus.FORWARDED);
	        routeRepository.save(route);

	        Long toId = route.getToId().getId();
	        Warehouse warehouse = warehouseRepository.findById(toId).orElseThrow();
	        Routes routeToID = routeRepository.findRoutesByFromIdAndStatus(warehouse, RoutesStatus.NOT_REACHED);
	        routeToID.setStatus(RoutesStatus.PLACED);
	        return routeRepository.save(route);
	    }
	    
//	    new code
	    public Warehouse getWarehouseByUserId(Long userId) {
	        Users manager = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        return warehouseRepository.findByManager(manager).orElseThrow(() -> new RuntimeException("Warehouse not found"));
	    }

	    public List<Routes> getRoutesByWarehouseAndStatus(Long warehouseId, RoutesStatus status) {
	        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow();
	        return routeRepository.findByToIdAndStatus(warehouse, status);
	    }
	    
	 // New method to fetch routes for assigning a delivery agent
//	    public List<Routes> getRoutesForAssignDeliveryAgent(Long warehouseId) {
//	        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow(() -> new RuntimeException("Warehouse not found"));
//	        return routeRepository.findByToIdAndStatus(warehouse, RoutesStatus.ACCEPTED);
//	    }

	    // Method to assign a delivery agent to the route
//	    public Routes assignDeliveryAgent(Long routeId, Long deliveryAgentId) {
//	        Routes route = routeRepository.findById(routeId).orElseThrow(() -> new RuntimeException("Route not found"));
//	        Users deliveryAgent = userRepository.findById(deliveryAgentId).orElseThrow(() -> new RuntimeException("Delivery agent not found"));
//	        route.setDeliveryAgentId(deliveryAgent);
//	        route.setStatus(RoutesStatus.DELIVERY_ASSIGNED);
//	        return routeRepository.save(route);
//	    }

}



