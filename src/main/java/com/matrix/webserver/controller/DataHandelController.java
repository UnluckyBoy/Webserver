package com.matrix.webserver.controller;

import com.google.gson.Gson;
import com.matrix.webserver.model.UserInfo;
import com.matrix.webserver.tools.WebServerResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
    private static Gson gson=new Gson();//Json数据对象

    @RequestMapping("/userInfo")
    public void getCurrentUser(@AuthenticationPrincipal UserInfo userInfo,
                               HttpServletResponse response) throws IOException {/*ResponseEntity<?>*/
        // 在这里执行其他逻辑
        System.out.println("登录信息:"+userInfo.getUsername()+"---"+userInfo.getPassword());
        if(userInfo==null){
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
            System.out.println("返回信息:"+WebServerResponse.failure("请求失败")+"---"+userInfo);
        }
        // 返回JSON数据
        response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userInfo)));
        System.out.println("返回信息:"+WebServerResponse.success("请求成功",userInfo));
        //Map<String, Object> response = new HashMap<>();
        //response.put("username", userDetails.getUsername());
        // ... 可以添加其他用户详情
        //return ResponseEntity.ok(response);
    }
}
