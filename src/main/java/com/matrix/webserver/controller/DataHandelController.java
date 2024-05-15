package com.matrix.webserver.controller;

import com.google.gson.Gson;
import com.matrix.webserver.model.AuthorityInfo;
import com.matrix.webserver.model.PatientInfo;
import com.matrix.webserver.model.UserInfo;
import com.matrix.webserver.model.mapper.GhDataMapper;
import com.matrix.webserver.service.AuthorityService;
import com.matrix.webserver.service.PatientInfoService;
import com.matrix.webserver.tools.PrintTool;
import com.matrix.webserver.tools.TimeUtil;
import com.matrix.webserver.tools.WebServerResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private AuthorityService authorityService;
    @Autowired
    private PatientInfoService patientInfoService;
    @Autowired
    private GhDataMapper ghDataMapper;

    private static Gson gson=new Gson();//Json数据对象

    /**
     * 获取认证用户信息并返回
     * @param authentication
     * @param response
     * @throws IOException
     */
    @RequestMapping("/userInfo")
    public void checkAuthentication(Authentication authentication,HttpServletResponse response) throws IOException{
        // 如果authentication为null，则认证流程没有触发或成功
        UserInfo userInfo=getUserInfo(authentication);
        if (userInfo==null) {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",userInfo)));
        }
    }

    /**
     * 权限获取
     * @param authentication
     * @param response
     * @throws IOException
     */
    @RequestMapping("/authority")
    public void getAuthority(Authentication authentication,HttpServletResponse response) throws IOException{
        UserInfo userInfo=getUserInfo(authentication);
        if(userInfo==null){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }else{
            List<AuthorityInfo> authorityInfoList=authorityService.queryAuthority(userInfo.getUAccount());
            System.out.println("返回信息:"+gson.toJson(WebServerResponse.success("请求成功",authorityInfoList)));
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",authorityInfoList)));
        }
    }

    /**
     * 患者信息查询
     * @param patient
     * @param authentication
     * @param response
     * @throws IOException
     */
    @RequestMapping("/patientInfo")
    public void getPatient(@RequestParam("patient") String patient,
                           Authentication authentication,HttpServletResponse response) throws IOException{
        PatientInfo patientInfo=patientInfoService.queryPatient(patient);
        // 准备返回的数据
        if(patientInfo==null){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("请求失败")));
        }else{
            System.out.println("返回信息:"+gson.toJson(WebServerResponse.success("请求成功",patientInfo)));
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("请求成功",patientInfo)));
        }
    }

    /**
     * 挂号信息回写插值
     * @param requestBody
     * @param response
     * @throws IOException
     */
    @RequestMapping("/gh_update_data")
    public void ghUpdateHandle(@RequestBody Map<String, Object> requestBody,
                               HttpServletResponse response) throws IOException{
        requestBody.put("gh_number", TimeUtil.timeToString(TimeUtil.GetTime(false))+String.format("%06d", (ghDataMapper.get_gh_count()+1)));
        System.out.println("requestBody:"+requestBody.toString());
        boolean resultAdd=ghDataMapper.gh_add(requestBody);
        if(resultAdd){
            //String temp=PrintTool.doPrintHandle();
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("挂号成功",requestBody)));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("挂号失败")));
        }
    }

    /**
     * 查询认证用户
     * @param authentication
     * @return
     */
    private UserInfo getUserInfo(Authentication authentication){
        // 如果authentication为null，则认证流程没有触发或成功
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("用户未认证");
            return null;
        }
        // 如果authentication不为null且已认证，则可以访问用户详情
        assert authentication != null;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserInfo) {
            UserInfo userInfoDetails = (UserInfo) principal;
            // 获取用户详情
            System.out.println("认证用户: " + userInfoDetails.getUsername());
            return userInfoDetails;
        } else {
            // 如果不是UserDetails类型，可能是其他类型的Principal，比如String用户名等
            System.out.println("用户认证,但角色异常: " + principal.toString());
            return null;
        }
    }
}
