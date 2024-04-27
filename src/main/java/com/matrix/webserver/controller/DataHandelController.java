package com.matrix.webserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName DataHandelController
 * @Author Create By matrix
 * @Date 2024/4/27 0027 19:57
 *
 * 登陆之后api逻辑
 */
@RestController
@RequestMapping("/api")
public class DataHandelController {
    @RequestMapping("/user")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        // 在这里执行其他逻辑

        // 返回JSON数据
        Map<String, Object> response = new HashMap<>();
        response.put("username", userDetails.getUsername());
        // ... 可以添加其他用户详情
        return ResponseEntity.ok(response);
    }
}
