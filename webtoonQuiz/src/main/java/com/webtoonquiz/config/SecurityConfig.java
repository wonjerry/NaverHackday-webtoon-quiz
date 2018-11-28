package com.webtoonquiz.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsService userDetailsService;

	// Authentication : User --> Roles
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());
	}

	// Authorization : Role -> Access
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().and()./*authorizeRequests()
		//.antMatchers(HttpMethod.GET,"/api/**").hasRole("USER")
		.antMatchers(HttpMethod.DELETE).hasRole("ADMIN")
		.antMatchers(HttpMethod.POST).hasRole("ADMIN")
		.antMatchers(HttpMethod.PUT).hasRole("ADMIN")
		.and().*/csrf().disable().headers().frameOptions().disable();
	}

	private PasswordEncoder getPasswordEncoder() {
		return new PasswordEncoder() {

			@Override
			public boolean matches(CharSequence rawPassword, String encodedPassword) {
				System.out.println("matches : " + rawPassword + " , " + encodedPassword);
				return true;
			}

			@Override
			public String encode(CharSequence rawPassword) {
				System.out.println("rawPassword : " + rawPassword );
				return rawPassword.toString()+"1";
			}
		};
	}

}