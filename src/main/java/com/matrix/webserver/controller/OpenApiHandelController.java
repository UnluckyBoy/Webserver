package com.matrix.webserver.controller;

import com.matrix.webserver.service.AuthorityService;
import com.matrix.webserver.service.PatientInfoService;
import com.matrix.webserver.tools.TimeUtil;
import com.matrix.webserver.tools.UUIDNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
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

@Controller
//@RestController
@RequestMapping("/openApi")
public class OpenApiHandelController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;
    @Autowired
    private PatientInfoService patientInfoService;

    @RequestMapping("/test_password")
    public ResponseEntity<Map<String, Object>> getData(@RequestParam("password") String password) {
        // 准备返回的数据
        Map<String, Object> data = new HashMap<>();
        data.put("password", passwordEncoder.encode(password));
        return ResponseEntity.ok(data);
    }
    @RequestMapping("/test_id")
    public ResponseEntity<Map<String, Object>> getID(@RequestParam("birthday") String birthday) {
        // 准备返回的数据
        Map<String, Object> data = new HashMap<>();
        data.put("password",TimeUtil.timeToString(TimeUtil.GetTime(true))+birthday+ UUIDNumberUtil.randUUIDNumber());
        return ResponseEntity.ok(data);
    }
    @RequestMapping("/test_patient")
    public ResponseEntity<Map<String, Object>> getPatient(@RequestParam("patient") String patient) {
        // 准备返回的数据
        Map<String, Object> data = new HashMap<>();
        data.put("password",patientInfoService.queryPatient(patient));
        return ResponseEntity.ok(data);
    }

    @RequestMapping("/index")
    public String Index(){
        return "index";
    }

    @RequestMapping("/authority")
    public void getAuthority(@RequestParam("account") String account){
        System.out.println("用户权限:"+authorityService.queryAuthority(account));
    }

    @RequestMapping("/draw_image")
    public String drawImage(){
        return "drawImage";
    }
}
