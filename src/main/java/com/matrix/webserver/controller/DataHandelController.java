package com.matrix.webserver.controller;

import com.google.gson.Gson;
import com.matrix.webserver.model.*;
import com.matrix.webserver.model.mapper.GhDataMapper;
import com.matrix.webserver.service.AuthorityService;
import com.matrix.webserver.service.PatientInfoService;
import com.matrix.webserver.tools.PrintTool;
import com.matrix.webserver.tools.TimeUtil;
import com.matrix.webserver.tools.UUIDNumberUtil;
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
import java.sql.SQLException;
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
     * 当日挂号数据
     * @param response
     * @throws IOException
     */
    @RequestMapping("/gh_current_day")
    public void ghCurrentDayData(HttpServletResponse response) throws IOException{
        List<CurrentDayGhInfo> result=ghDataMapper.get_current_day_gh();
        System.out.println("当日挂号数据:"+result.toString());
        if(result.size()>0){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("获取数据成功",result)));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("获取数据失败")));
        }
    }

    /**
     * 退号处理
     * @param requestBody
     * @param response
     * @throws IOException
     */
    @RequestMapping("/gh_cancel")
    public void ghCancel(@RequestBody Map<String, Object> requestBody,HttpServletResponse response) throws IOException{
        System.out.println("推号数据:"+requestBody.toString());
        boolean result_cancel=ghDataMapper.cancel_regis(requestBody);
        if(result_cancel){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("退号成功！")));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("此条目已退！")));
        }
    }


    @RequestMapping("/regis_patient")
    public void regisPatient(@RequestBody Map<String, Object> requestBody,HttpServletResponse response) throws IOException, SQLException {
        requestBody.put("patient_id",
                TimeUtil.timeToString(TimeUtil.GetTime(true))+
                        requestBody.get("birth").toString().replace("-","")+ UUIDNumberUtil.randUUIDNumber());
        System.out.println("推号数据:"+requestBody.toString());
        boolean result_regis=patientInfoService.regis_patient(requestBody);
        if(result_regis){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("患者注册成功！")));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("患者注册失败！")));
        }
        //response.setContentType("application/json;charset=UTF-8");
        //response.getWriter().write(gson.toJson(WebServerResponse.failure("患者注册失败！")));
    }

    /**
     * 近2月内注册的信息
     * @param response
     * @throws IOException
     */
    @RequestMapping("/get_two_month_patients")
    public void getTwoMonPatients(HttpServletResponse response) throws IOException{
        List<PatientView> resultList=patientInfoService.query_near_two_month_patients();
        System.out.println("2月内注册:"+resultList.get(0).getPatient_contactPhone());
        if(resultList.size()>0){
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.success("获取数据成功",resultList)));
        }else{
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(WebServerResponse.failure("获取数据失败")));
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
