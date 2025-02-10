package com.courier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Warehouse;
import com.courier.services.RouteService;

@RestController
@RequestMapping("/routes")
@CrossOrigin(origins ="http://localhost:3000")

public class RouteController {
	
	@Autowired 
	private RouteService routeService;
	@GetMapping("/byWarehouse/{warehouseId}")
    public List<Routes> getRoutesByWarehouseAndStatus(@PathVariable Long warehouseId) {
        return routeService.getRoutesByWarehouseAndStatus(warehouseId);
    }
	 @PostMapping("/acceptOrder/{routeId}")
	    public ResponseEntity<Routes> acceptOrder(@PathVariable Long routeId) {
	        Routes updatedRoute = routeService.acceptOrder(routeId);
	        return ResponseEntity.ok(updatedRoute);
	    }
	 
	 @PostMapping("/forwardOrder/{routeId}")
	    public ResponseEntity<Routes> forwardOrder(@PathVariable Long routeId) {
	        Routes updatedRoute = routeService.forwardOrder(routeId);
	        return ResponseEntity.ok(updatedRoute);
	    }

//	 new code
	 @GetMapping("/byWarehouse/status")
	    public List<Routes> getRoutesByStatus(@RequestParam Long userId, @RequestParam RoutesStatus status) {
		 System.out.println(userId+" "+status);
		System.out.println("hello");
	        Warehouse warehouse = routeService.getWarehouseByUserId(userId);
	        return routeService.getRoutesByWarehouseAndStatus(warehouse.getId(), status);
	    }
	 


}


