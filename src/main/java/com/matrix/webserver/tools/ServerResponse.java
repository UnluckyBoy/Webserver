package com.matrix.webserver.tools;

import lombok.Data;

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
    private int code;//处理代码
    private String message;//处理描述
    private Object data;//处理数据

    private ServerResponse(){};

    public static ServerResponse error(){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setCode(404);
        resultResponse.setMessage("请求错误");
        resultResponse.setData(null);
        return resultResponse;
    }
    public static ServerResponse success(){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(true);
        resultResponse.setCode(200);
        resultResponse.setMessage("请求成功");
        resultResponse.setData(null);
        return resultResponse;
    }
    public static ServerResponse failure(){
        ServerResponse resultResponse=new ServerResponse();
        resultResponse.setHandleType(false);
        resultResponse.setCode(404);
        resultResponse.setMessage("请求失败");
        resultResponse.setData(null);
        return resultResponse;
    }
}
