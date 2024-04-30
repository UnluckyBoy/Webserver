package com.matrix.webserver.controller;

import com.google.gson.Gson;
import com.matrix.webserver.model.UserInfo;
import com.matrix.webserver.tools.WebServerResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

/**
 * @ClassName DataHandelController
 * @Author Create By matrix
 * @Date 2024/4/27 0027 19:57
 *
 * 登陆之后api逻辑
 */
@Controller
//@RestController
@RequestMapping("/api")
public class DataHandelController {
    //private final AuthenticationManager authenticationManager;
    private static Gson gson=new Gson();//Json数据对象

//    public DataHandelController(AuthenticationManager authenticationManager) {
//        this.authenticationManager = WebServerController.getAuthenticationManager();
//    }

    @RequestMapping("/userInfo")
    public void checkAuthentication(Authentication authentication,HttpServletResponse response) throws IOException{
        // 如果authentication为null，则认证流程没有触发或成功
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("User is not authenticated");
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
            //return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(WebServerResponse.failure("请求失败"));

        }
        // 如果authentication不为null且已认证，则可以访问用户详情
        assert authentication != null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfo) {
            UserInfo userDetails = (UserInfo) principal;
            // 这里可以访问用户详情，比如用户名等
            System.out.println("User is authenticated: " + userDetails.getUsername());
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userDetails)));
            //return ResponseEntity.ok(WebServerResponse.success("请求成功",userDetails));
        } else {
            // 如果不是UserDetails类型，可能是其他类型的Principal，比如String用户名等
            System.out.println("User is authenticated with a different type of principal: " + principal.toString());
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",principal.toString())));
            //return ResponseEntity.ok(WebServerResponse.success("请求成功",principal.toString()));
        }
    }
}
