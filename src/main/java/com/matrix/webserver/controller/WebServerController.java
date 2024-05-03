package com.matrix.webserver.controller;

import com.matrix.webserver.model.UserInfo;
import com.matrix.webserver.tools.WebServerResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @ClassName WebServerController
 * @Author Create By matrix
 * @Date 2024/4/26 0026 7:54
 */
//@RestController/*向前端返回Json数据*/
@Controller
public class WebServerController {
    @RequestMapping("/index")
    public String Index(){
        return "index";
    }
    @RequestMapping("/login")
    public String Login(){
        return "login";
    }

    @RequestMapping("/errorPage")
    public String errorPage(){
        return "error";
    }

    @RequestMapping("/test")
    public String Test(){
        return "test";
    }

    @RequestMapping("/check")
    public ResponseEntity<Object> checkAuthentication(Authentication authentication) {
        // 如果authentication为null，则认证流程没有触发或成功
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("用户未认证");
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(WebServerResponse.failure("请求失败"));
        }
        // 如果authentication不为null且已认证，则可以访问用户详情
        assert authentication != null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfo) {
            UserInfo userDetails = (UserInfo) principal;
            // 这里可以访问用户详情，比如用户名等
            System.out.println("认证用户: " + userDetails.getUsername());
            return ResponseEntity.ok(WebServerResponse.success("请求成功",userDetails));
        } else {
            // 如果不是UserDetails类型，可能是其他类型的Principal，比如String用户名等
            System.out.println("用户认证,但角色异常: " + principal.toString());
            return ResponseEntity.ok(WebServerResponse.success("请求成功",principal.toString()));
        }
    }
}
