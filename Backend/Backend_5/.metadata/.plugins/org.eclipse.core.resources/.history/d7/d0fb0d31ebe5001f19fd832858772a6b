package com.courier.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.courier.dto.ApiResponse;
import com.courier.dto.LoginRequestDto;
import com.courier.dto.LoginResponseDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.pojos.Address;
import com.courier.pojos.Role;
import com.courier.pojos.Users;
import com.courier.repository.UserRepository;
import com.courier.security.JWTService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JWTService jwtService;

	public LoginResponseDto login(LoginRequestDto dto) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		if (authentication.isAuthenticated()) {
			return new LoginResponseDto("success", jwtService.generateToken(authentication));
		}
		return new LoginResponseDto("failed", "");
	}

	public LoginResponseDto updateProfile(Users user) {
		Users persistantUser = userRepository.findById(user.getId()).orElseThrow();
		persistantUser.setAddress(user.getAddress());
		persistantUser.setContactNumber(user.getContactNumber());
		persistantUser.setFirstName(user.getFirstName());
		persistantUser.setLastName(user.getLastName());
		if (user.getAddress().getId() == null) {
			Address address = new Address();
			address.setCity(user.getAddress().getCity());
			address.setFlatNo(user.getAddress().getFlatNo());
			address.setLandmark(user.getAddress().getLandmark());
			address.setPincode(user.getAddress().getPincode());
			address.setStreetName(user.getAddress().getStreetName());
			address.setState(user.getAddress().getState());
		}
		else {
			persistantUser.setAddress(user.getAddress());
			
		}
		userRepository.save(persistantUser);
		return new LoginResponseDto("success", persistantUser);
	}

	public LoginResponseDto getProfile(Long id) {
		Users user = userRepository.findById(id).orElseThrow();
		return new LoginResponseDto("success", user);
	}

	public ApiResponse getAllDeliveryAgents() {
		List<Users> deliveryAgents = new ArrayList<>();
		deliveryAgents = userRepository.findByRole(Role.ROLE_DELIVERY_AGENT);
		return new ApiResponse("success",deliveryAgents);
	}

	public Users registerUser(RegisterRequestDto userDto) {
		Address address = new Address();
		address.setFlatNo(userDto.getFlatNo());
		address.setStreetName(userDto.getStreetName());
		address.setCity(userDto.getCity());
		address.setLandmark(userDto.getLandmark());
		address.setState(userDto.getState());
		address.setPincode(userDto.getPincode());
        Users user = modelMapper.map(userDto, Users.class);
        user.setAddress(address);
        user.setRole(Role.ROLE_CUSTOMER);
        return userRepository.save(user);
    }

	public Users registerDeliveryAgent(RegisterRequestDto userDto) {
		Address address = new Address();
		address.setFlatNo(userDto.getFlatNo());
		address.setStreetName(userDto.getStreetName());
		address.setCity(userDto.getCity());
		address.setLandmark(userDto.getLandmark());
		address.setState(userDto.getState());
		address.setPincode(userDto.getPincode());
        Users user = modelMapper.map(userDto, Users.class);
        user.setAddress(address);
        user.setRole(Role.ROLE_DELIVERY_AGENT);
        return userRepository.save(user);
		
	}
	

}
