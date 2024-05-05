package com.matrix.webserver.tools;

import java.util.UUID;

/**
 * @ClassName OrderNumberUtil
 * @Author Create By matrix
 * @Date 2024/1/23 0023 17:56
 * 生成UUID工具类
 */
public class UUIDNumberUtil {
    /**
     * 生成8位UUID
     * @return
     */
    public static String randUUIDNumber(){
        UUID uuid = UUID.randomUUID();
        return TimeUtil.timeToString(uuid.toString().substring(0, 8));
    }

    /**
     * 生成8位UUID+时间
     * @return
     */
    public static String randUUIDNumberAndTime(){
        UUID uuid = UUID.randomUUID();
        return TimeUtil.timeToString(uuid.toString().substring(0, 8)+TimeUtil.GetTime(true));
    }

    /**
     * 时间+生成8位UUID
     * @return
     */
    public static String randTimeAndUUIDNumber(){
        UUID uuid = UUID.randomUUID();
        return TimeUtil.timeToString(uuid.toString().substring(0, 8)+TimeUtil.GetTime(true));
    }

    /**
     * 生成8位UUID+时间参数
     * @param time
     * @return
     */
    public static String randUUIDNumberAndTime_Param(String time){
        UUID uuid = UUID.randomUUID();
        return TimeUtil.timeToString(uuid.toString().substring(0, 8)+time);
    }
}
