package net.javaguides.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("✅ SecurityConfig loaded!");

        http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/login").permitAll()
                .anyRequest().permitAll()
                .and()
                .formLogin().disable()
                .httpBasic().disable();

        return http.build();
    }

    // ✅ This prevents Spring from auto-creating default user
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
