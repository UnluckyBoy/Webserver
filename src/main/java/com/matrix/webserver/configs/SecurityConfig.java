package com.matrix.webserver.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @ClassName SecurityConfig
 * @Author Create By matrix
 * @Date 2024/4/26 0026 14:37
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    /**
     * PasswordEncoder:加密编码，这里使用 NoOpPasswordEncoder 明文密码，如果需要加密，用 BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        //明文加密
        return NoOpPasswordEncoder.getInstance();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeHttpRequests->
                        authorizeHttpRequests
                                // 放行静态资源
                                // 允许所有OPTIONS请求:HttpMethod.OPTIONS,
                                .requestMatchers(HttpMethod.GET,"/css/**","/img/**","/js/**").permitAll()
                                // 允许直接访问授权登录接口
                                .requestMatchers(HttpMethod.POST,"/login").permitAll()
                                // 允许 SpringMVC 的默认错误地址匿名访问
                                .requestMatchers("/error").permitAll()
                                .anyRequest().authenticated()
        );
        http.formLogin(formLogin->
                formLogin
                        .loginPage("/login")
                        .loginProcessingUrl("/login")//登录表单action的名字
                        .failureUrl("/errorPage")//错误页面
                        .successForwardUrl("/index")//成功页面
                        .permitAll()
        );
        // 6.2版本要使用 csrf.disable()而不是withDefault()方法,网上很多使用withDefault()方法
        http.csrf(csrf->csrf.disable());
        return http.build();
    }
//    @Bean
//    public WebSecurityCustomizer ignoringCustomizer() {
//        return (web) -> web.ignoring().requestMatchers("/css/**","/img/**","/js/**");
//    }
}
