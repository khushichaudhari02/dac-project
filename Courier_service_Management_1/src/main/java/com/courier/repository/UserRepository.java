package com.courier.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.dto.RegisterRequestDto;
import com.courier.pojos.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	
	Users findByEmailAndPassword(String email, String password);
	
	
	
	

}
