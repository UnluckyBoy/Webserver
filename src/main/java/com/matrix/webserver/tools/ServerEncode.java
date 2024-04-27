package com.matrix.webserver.tools;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @ClassName ServerEncode
 * @Author Create By matrix
 * @Date 2024/4/27 0027 18:55
 */
public class ServerEncode {
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 加密
     * @param rawPassword
     * @return
     */
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * 验证密码是否正确
     * @param rawPassword
     * @param encodedPassword
     * @return
     */
    public boolean isPasswordMatch(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
