package com.matrix.webserver.tools;

import java.util.UUID;

/**
 * @ClassName OrderNumberUtil
 * @Author Create By matrix
 * @Date 2024/1/23 0023 17:56
 * 生成订单工具类
 */
public class OrderNumberUtil {
    public static String randOrderNumber(){
        UUID orderId = UUID.randomUUID();
        String shortOrderId =TimeUtil.formatTime(orderId.toString().substring(0, 8)+TimeUtil.GetTime(true));
        return shortOrderId;
    }

    public static String randOrderNumberParam(String time){
        UUID orderId = UUID.randomUUID();
        String shortOrderId =TimeUtil.formatTime(orderId.toString().substring(0, 8)+time);
        return shortOrderId;
    }
}
