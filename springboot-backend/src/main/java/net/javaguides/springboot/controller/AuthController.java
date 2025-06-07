package net.javaguides.springboot.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Dummy check, replace with DB/userService logic
        if ("admin".equals(username) && "admin123".equals(password)) {
            return ResponseEntity.ok(Map.of("token", "dummy-admin-token", "role", "ADMIN"));
        } else if ("user".equals(username) && "user123".equals(password)) {
            return ResponseEntity.ok(Map.of("token", "dummy-user-token", "role", "USER"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
