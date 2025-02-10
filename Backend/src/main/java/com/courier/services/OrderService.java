package com.courier.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.OrderDto;
import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.TrackingIdGenerator;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
import com.courier.repository.DeliveryAgentRepository;
import com.courier.repository.OrdersRepository;
import com.courier.repository.RouteRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
	
	private static int deliveryagentNumber=0;

	@Autowired
	private OrdersRepository ordersRepository;

	@Autowired
	private UserRepository usersRepository;
	
	@Autowired
	private RouteRepository routesRepository;
	
	@Autowired
	private WarehouseRepository warehouseRepository;
	
	@Autowired
	private DeliveryAgentRepository deliveryAgentRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private Graph graph;

	public List<OrderDto> getAllOrders() {
		List<Orders> orders = ordersRepository.findAll();
		List<OrderDto> ordersDto = orders.stream().map(order -> modelMapper.map(order, OrderDto.class))
				.collect(Collectors.toList());
		for (int i = 0; i < orders.size(); i++) {
			ordersDto.get(i).setSource(orders.get(i).getFromWarehouse().getLocation().getCity());
			ordersDto.get(i).setDestination(orders.get(i).getToWarehouse().getLocation().getCity());
		}
		return ordersDto;
	}

	public List<Orders> deliveryAgentHistory(Long id) {
		Users user = usersRepository.findById(id).orElseThrow();
		DeliveryAgents agent = deliveryAgentRepository.findByUser(user);
		return ordersRepository.findByStatusAndDeliveryAgentId(OrderStatus.DELIVERED, agent);
	}

	public List<Orders> deliveryAgentDeliveries(Long id) {
		Users user = usersRepository.findById(id).orElseThrow();
		DeliveryAgents agent = deliveryAgentRepository.findByUser(user);
		return ordersRepository.findByDeliveryAgentIdAndStatus(agent, OrderStatus.OUT_FOR_DELIVERY);
	}

	public PlaceOrderResponseDto placeOrder(PlaceOrderRequestDto requestDTO) {

		// Fetch sender user
		Users senderId = usersRepository.findById(requestDTO.getSenderId())
				.orElseThrow(() -> new RuntimeException("Sender not found"));

		// Fetch warehouses
		Warehouse fromWarehouse = warehouseRepository.findById(requestDTO.getFromWarehouseId())
				.orElseThrow(() -> new RuntimeException("Source warehouse not found"));

		Warehouse toWarehouse = warehouseRepository.findById(requestDTO.getToWarehouseId())
				.orElseThrow(() -> new RuntimeException("Destination warehouse not found"));

		Orders order = new Orders();
		order.setOrderDate(new Date());
		order.setDeliveryDate(null);
		order.setTrackingId(TrackingIdGenerator.generateTrackingId());
		order.setReceiverName(requestDTO.getReceiverName());
		order.setContactNumber(requestDTO.getContactNumber());
		order.setWeight(requestDTO.getWeight());
		order.setFromWarehouse(fromWarehouse);
		order.setToWarehouse(toWarehouse);
		order.setSenderId(senderId);
		order.setPrice(requestDTO.getPrice());
		order.setStatus(OrderStatus.PLACED);

		Orders savedOrder = ordersRepository.save(order);
		System.out.println("savedOrder"+savedOrder);
		PlaceOrderResponseDto responseDTO = new PlaceOrderResponseDto();
		responseDTO.setOrderId(savedOrder.getId());
		responseDTO.setTrackingId(savedOrder.getTrackingId());
		responseDTO.setOrderDate(savedOrder.getOrderDate());
		responseDTO.setReceiverName(savedOrder.getReceiverName());
		responseDTO.setContactNumber(savedOrder.getContactNumber());
		responseDTO.setWeight(savedOrder.getWeight());
		responseDTO.setPrice(savedOrder.getPrice());
		responseDTO.setStatus(savedOrder.getStatus());
		responseDTO.setFromWarehouse(savedOrder.getFromWarehouse().getLocation().getCity());
		responseDTO.setToWarehouse(savedOrder.getToWarehouse().getLocation().getCity());

		createRoutesForOrder(savedOrder, requestDTO.getFromWarehouseId(), requestDTO.getToWarehouseId());
		System.out.println("dto"+responseDTO);
		return responseDTO;

	}
	private void createRoutesForOrder(Orders order, long sourceId, long destinationId) {
		
        Map<Long, String> warehouseIdToName = Map.of(
            3L, "Delhi",
            5L, "Pune",
            4L, "Hyderabad",
            2L, "Chennai",
            1L,"Mumbai"
        );

        // Convert IDs to names for the graph search
        String sourceName = warehouseIdToName.get(sourceId);
        String destinationName = warehouseIdToName.get(destinationId);

        // Find the shortest path
        Map<String, Object> pathResult = graph.dijkstra(sourceName, destinationName);
        List<String> shortestPath = (List<String>) pathResult.get("path");

        if (shortestPath.isEmpty()) {
            throw new RuntimeException("No valid route found from " + sourceName + " to " + destinationName);
        }

        List<Routes> routesList = new ArrayList<>();

        // Get the Warehouse object for ID 1 (hardcoded A)
        Warehouse sourceWarehouse = warehouseRepository.findById(sourceId)
                .orElseThrow();

        // 1. Add "PLACED" status for (A → A)
        Routes firstRoute = new Routes();
        firstRoute.setOrderId(order);
        firstRoute.setFromId(sourceWarehouse);
        firstRoute.setToId(sourceWarehouse); // A → A
        firstRoute.setArrivalDate(LocalDateTime.now());
        firstRoute.setStatus(RoutesStatus.PLACED);
        routesList.add(firstRoute);

        // 2. Add "NOT_REACHED" status for each segment (A → B, B → C, etc.)
        for (int i = 0; i < shortestPath.size() - 1; i++) {
            // Get warehouse IDs from the name mapping
            long fromWarehouseId = getKeyByValue(warehouseIdToName, shortestPath.get(i));
            long toWarehouseId = getKeyByValue(warehouseIdToName, shortestPath.get(i + 1));

            Warehouse from = warehouseRepository.findById(fromWarehouseId)
                    .orElseThrow();

            Warehouse to = warehouseRepository.findById(toWarehouseId)
                    .orElseThrow();

            Routes route = new Routes();
            route.setOrderId(order);
            route.setFromId(from);
            route.setToId(to);
            route.setArrivalDate(null);
            route.setStatus(RoutesStatus.NOT_REACHED);
            routesList.add(route);
        }

        // Save all routes
        routesRepository.saveAll(routesList);
    }
	private Long getKeyByValue(Map<Long, String> map, String value) {
        for (Map.Entry<Long, String> entry : map.entrySet()) {
            if (entry.getValue().equals(value)) {
                return entry.getKey();
            }
        }
        throw new RuntimeException("Warehouse ID not found for name: " + value);
    }

	public List<OrderDto> getAllOrdersByCustomer(Long customerId) {
		Users customer = usersRepository.findById(customerId).orElseThrow();
		List<Orders> orders = ordersRepository.findAllBySenderId(customer);
		List<OrderDto> ordersDto = orders.stream().map(order -> modelMapper.map(order, OrderDto.class))
				.collect(Collectors.toList());
		for (int i = 0; i < orders.size(); i++) {
			ordersDto.get(i).setSource(orders.get(i).getFromWarehouse().getLocation().getCity());
			ordersDto.get(i).setDestination(orders.get(i).getToWarehouse().getLocation().getCity());
		}
		return ordersDto;
	
	}

	public DeliveryAgents assignDelivery(Long routeId, Long managerId) {
		Routes route=routesRepository.findById(routeId).orElseThrow();
		Users manager=usersRepository.findById(managerId).orElseThrow();
		Warehouse warehouse=warehouseRepository.findByManager(manager);
		List<DeliveryAgents> agents= deliveryAgentRepository.findByWarehouse(warehouse);
		Orders order = route.getOrderId();
		order.setDeliveryAgentId(agents.get(deliveryagentNumber));
		order.setStatus(OrderStatus.OUT_FOR_DELIVERY);
		route.setDispatchDate(LocalDateTime.now());
		deliveryagentNumber=(deliveryagentNumber+1)%(agents.size());
		
		return order.getDeliveryAgentId();
	}

	public String deliverOrder(Long orderId) {
        Orders order = ordersRepository.findById(orderId).orElseThrow();
        
        List<Routes> routes = routesRepository.findByOrderId(order);
        for(Routes route: routes) {
        	//route.setStatus(RoutesStatus.DELIVERED);
        	routesRepository.save(route);
        }
        
        order.setDeliveryDate(new Date());
        order.setStatus(OrderStatus.DELIVERED);
        ordersRepository.save(order);
        return "success";
    }

}
