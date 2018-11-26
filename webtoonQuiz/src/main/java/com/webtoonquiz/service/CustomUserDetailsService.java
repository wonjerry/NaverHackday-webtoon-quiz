package com.webtoonquiz.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.webtoonquiz.model.CustomUserDetails;
import com.webtoonquiz.model.Users;
import com.webtoonquiz.repo.UsersReopository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UsersReopository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Users> optionalUser = userRepository.findByName(username);
		optionalUser
			.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		optionalUser
			.ifPresent(users -> {
				new CustomUserDetails(users);
			});
		CustomUserDetails customUserDetails = optionalUser
				.map(CustomUserDetails::new).get();
		/*System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println(customUserDetails);*/
		return customUserDetails;
	}

}
