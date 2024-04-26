package com.matrix.webserver.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName WebServerController
 * @Author Create By matrix
 * @Date 2024/4/26 0026 7:54
 */
//@RestController/*向前端返回Json数据*/
@Controller
public class WebServerController {
    @RequestMapping("/index")
    public String Index(Model model, HttpSession session){
        return "/view/index";
    }
    @RequestMapping("/login")
    public String Login(Model model, HttpSession session){
        return "/view/login_test";
    }

    @RequestMapping("/errorPage")
    public String errorPage(Model model, HttpSession session){
        return "/view/error";
    }
}
