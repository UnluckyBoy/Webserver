package com.matrix.webserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName OpenApiHandel
 * @Author Create By matrix
 * @Date 2024/4/27 0027 20:00
 */

@RestController
@RequestMapping("/openApi")
public class OpenApiHandelController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping("/test")
    public ResponseEntity<Map<String, Object>> getData(@RequestParam("password") String password) {
        // 准备返回的数据
        Map<String, Object> data = new HashMap<>();
        data.put("password", passwordEncoder.encode(password));
        return ResponseEntity.ok(data);
    }
}
