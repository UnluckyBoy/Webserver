package com.matrix.webserver.tools;

import lombok.Data;
import org.springframework.security.core.AuthenticationException;

/**
 * @ClassName ServerResponse
 * @Author Create By matrix
 * @Date 2024/4/27 0027 9:03
 *
 * 服务器返回Response
 */
@Data
public class WebServerResponse {
    private boolean handleType;//处理状态
    private int handleCode;//处理代码
    private String handleMessage;//处理描述
    private Object handleData;//处理数据

    private WebServerResponse(){};

    public static WebServerResponse error(){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage("请求错误");
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static WebServerResponse success(){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(true);
        resultResponse.setHandleCode(200);
        resultResponse.setHandleMessage("请求成功");
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static WebServerResponse success(String message){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(true);
        resultResponse.setHandleCode(200);
        resultResponse.setHandleMessage(message);
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static WebServerResponse success(String message,Object object){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(true);
        resultResponse.setHandleCode(200);
        resultResponse.setHandleMessage(message);
        resultResponse.setHandleData(object);
        return resultResponse;
    }
    public static WebServerResponse failure(){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage("内部错误");
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static WebServerResponse failure(AuthenticationException exception){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage(MessageUtil.Message(exception));
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static WebServerResponse failure(String message){
        WebServerResponse resultResponse=new WebServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage(message);
        resultResponse.setHandleData(null);
        return resultResponse;
    }
}
