package com.matrix.webserver.tools;

import java.util.Random;

/**
 * @ClassName CaptchaGenerator
 * @Author Create By matrix
 * @Date 2024/4/26 0026 7:55
 * 验证码生成
 */
public class CaptchaGenerator {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int LENGTH = 6;
    private static final Random RANDOM = new Random();

    public static String generateCaptcha() {
        StringBuilder captcha = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            captcha.append(CHARACTERS.charAt(index));
        }
        return captcha.toString();
    }
}
