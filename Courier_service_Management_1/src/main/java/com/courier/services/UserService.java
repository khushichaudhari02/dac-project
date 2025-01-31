package com.courier.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.LoginRequestDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.pojos.Address;
import com.courier.pojos.Orders;
import com.courier.pojos.Role;
import com.courier.pojos.Users;
import com.courier.repository.OrdersRepository;
import com.courier.repository.UserRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelmapper;
	
	public Users login(LoginRequestDto dto) {
		Users user = userRepository.findByEmailAndPassword(dto.getEmail(),dto.getPassword());
		return user;
	}
	
	public Users registerUser(RegisterRequestDto userDto) {
		Address address = new Address();
		address.setFlatNo(userDto.getFlatNo());
		address.setStreetName(userDto.getStreetName());
		address.setCity(userDto.getCity());
		address.setLandmark(userDto.getLandmark());
		address.setState(userDto.getState());
		address.setPincode(userDto.getPincode());
        Users user = modelmapper.map(userDto, Users.class);
        user.setAddress(address);
        user.setRole(Role.CUSTOMER);
        return userRepository.save(user);
    }
	
	
	
}
