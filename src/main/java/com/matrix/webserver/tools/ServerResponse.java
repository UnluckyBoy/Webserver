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
public class ServerResponse {
    private boolean handleType;//处理状态
    private int handleCode;//处理代码
    private String handleMessage;//处理描述
    private Object handleData;//处理数据

    private ServerResponse(){};

    public static ServerResponse error(){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage("请求错误");
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static ServerResponse success(){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(true);
        resultResponse.setHandleCode(200);
        resultResponse.setHandleMessage("请求成功");
        resultResponse.setHandleData(null);
        return resultResponse;
    }
    public static ServerResponse failure(AuthenticationException exception){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setHandleCode(404);
        resultResponse.setHandleMessage(MessageUtil.Message(exception));
        resultResponse.setHandleData(null);
        return resultResponse;
    }
}
