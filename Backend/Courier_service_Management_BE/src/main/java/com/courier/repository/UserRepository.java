package com.courier.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Role;
import com.courier.pojos.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	
	Users findByEmailAndPassword(String email, String password);

	List<Users> findByRole(Role deliveryAgent);
	
	Optional <Users> findById(Long id);

}
